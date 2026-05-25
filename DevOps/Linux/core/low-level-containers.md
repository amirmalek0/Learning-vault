# Low-Level Container Technologies

This document provides an in-depth explanation of the low-level container technologies that existed before Docker popularized containers.

## Introduction

Docker did **not invent containers**. It popularized them by providing a user-friendly experience on top of existing Linux kernel features that had been available since the mid-2000s.

These underlying technologies are often called **low-level container runtimes** or **container primitives**.

---

## Core Linux Kernel Features

All modern container technologies rely on two fundamental Linux kernel features:

### 1. Namespaces (`namespaces`)
Namespaces provide **isolation** by partitioning kernel resources.

| Namespace | Isolates | Description |
|-----------|----------|-------------|
| **PID** | Process IDs | Each container gets its own process tree (PID 1 inside container ≠ PID 1 on host) |
| **NET** | Network | Separate network interfaces, IP addresses, routing tables, and ports |
| **MNT** | Mount points | Separate filesystem mount points |
| **UTS** | Hostname/Domain | Container can have its own hostname |
| **IPC** | Inter-Process Communication | Separate message queues, semaphores, shared memory |
| **USER** | User/Group IDs | Map users inside container to different users on host (root inside ≠ root outside) |
| **CGROUP** | Cgroup control | Control which cgroups the process can see |

### 2. Control Groups (`cgroups`)
cgroups provide **resource limiting and accounting**.

- Limit CPU usage
- Limit memory usage
- Limit I/O (disk/network)
- Prioritize processes
- Track resource usage

---

## Major Low-Level Container Technologies

### 1. LXC (Linux Containers)

**Released**: 2008

**Description**:
LXC was the first major implementation that combined namespaces and cgroups to create system containers.

**Characteristics**:
- Provides **full system containers** (you get an almost complete Linux distribution inside the container)
- Closer to a lightweight VM than application containers
- Uses its own tools: `lxc-create`, `lxc-start`, `lxc-stop`, etc.
- Templates for creating container root filesystems

**Example**:
```bash
lxc-create -t ubuntu -n mycontainer
lxc-start -n mycontainer
lxc-attach -n mycontainer
```

**Limitations**:
- Complex CLI
- No image distribution system
- Not standardized

---

### 2. LXD

**Released**: 2015 (by Canonical)

**Description**:
LXD is a **daemon and REST API** built on top of LXC. It was created to make LXC easier to use and manage at scale.

**Key Features**:
- RESTful API (can be used remotely)
- Image store with versioning and signatures
- Snapshots and live migration
- Storage pools (ZFS, Btrfs, LVM support)
- Much better security defaults than raw LXC

**Analogy**:
> "LXD is to LXC what Docker is to `runc` + `containerd`"

**Example**:
```bash
lxc launch ubuntu:22.04 myvm
lxc exec myvm -- bash
lxc snapshot myvm clean-state
```

**Use Case**:
Often used for system containers and running multiple VMs-like workloads on a single host.

---

### 3. LXCFS

**Description**:
LXCFS is a **FUSE-based filesystem** that provides "fake" `/proc`, `/sys`, and `/dev` filesystems to containers.

**Problem it solves**:
Many applications (especially monitoring tools like `top`, `free`, `htop`) read from `/proc` and `/sys` to determine available memory and CPU. Without LXCFS, containers would see the **host's** resources instead of their **limited** resources.

**Example**:
```bash
# Inside container without LXCFS
free -h
# Shows host memory (e.g., 64GB)

# Inside container with LXCFS
free -h
# Shows container limit (e.g., 2GB)
```

**Current Status**:
Still used by LXC/LXD. Docker has its own implementation of this behavior.

---

### 4. runc (formerly libcontainer)

**Description**:
`runc` is the **reference implementation** of the OCI (Open Container Initiative) runtime specification. It is the low-level tool that actually creates and runs containers.

**History**:
- Originally part of Docker as `libcontainer`
- Docker donated it to the OCI in 2015
- Now maintained as an independent project

**What it does**:
- Creates namespaces
- Sets up cgroups
- Changes root filesystem (`pivot_root` or `chroot`)
- Executes the user-specified command

**Docker's relationship**:
```mermaid
Docker CLI → containerd → runc → Linux Kernel
```

**Example** (rarely used directly):
```bash
runc run mycontainer
```

**Key Point**:
Modern Docker does **not** call `runc` directly. It goes through `containerd`.

---

### 5. containerd

**Description**:
`containerd` is a **high-level container runtime** that manages the lifecycle of containers using `runc`.

**Responsibilities**:
- Image management and storage
- Container execution and supervision
- Network and storage attachment
- gRPC API

**Architecture**:
```
Docker → containerd → runc
```

**Status**:
containerd is now the default container runtime used by Docker, Kubernetes (via CRI), and many other platforms.

---

### 6. CRI-O

**Description**:
CRI-O is a lightweight container runtime purpose-built for Kubernetes. It implements the Container Runtime Interface (CRI) directly.

**Key Points**:
- Does not include Docker components
- Uses runc or crun underneath
- Smaller attack surface than Docker
- Designed specifically for Kubernetes

---

### 7. crun

**Description**:
`crun` is a fast, lightweight OCI runtime written in C (alternative to runc which is written in Go).

**Advantages**:
- Much faster startup time
- Lower memory usage
- Better support for advanced features (especially cgroups v2)

---

## Comparison Table

| Technology | Level | Primary Use | API | Image Support | Kubernetes Support |
|------------|-------|-------------|-----|---------------|--------------------|
| **LXC** | Low | System containers | CLI | Manual | No |
| **LXD** | Medium | System containers | REST API | Yes | Limited |
| **runc** | Low | Application containers | CLI | No | Via containerd/CRI-O |
| **containerd** | Medium | Application containers | gRPC | Yes | Yes (via CRI) |
| **CRI-O** | Medium | Kubernetes | CRI | Yes | Native |
| **crun** | Low | Application containers | CLI | No | Via containerd |

---

## Modern Container Runtime Architecture (2024)

```text
User
  ↓
Docker / Kubernetes / Podman
  ↓
containerd (or CRI-O)
  ↓
runc (or crun)
  ↓
Linux Kernel (namespaces + cgroups)
```

---

## Summary

| Technology | Role |
|------------|------|
| **Namespaces + cgroups** | Foundation (kernel) |
| **LXC** | First practical container implementation |
| **LXD** | User-friendly LXC management |
| **runc** | OCI reference runtime |
| **containerd** | Container lifecycle manager |
| **CRI-O** | Kubernetes-native runtime |

Understanding these layers helps you appreciate why Docker became so popular — it hid this complexity behind a beautiful developer experience.