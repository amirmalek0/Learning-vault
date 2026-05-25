# Docker Overview

## Why Do We Need Docker? (Compatibility Issues)

Docker solves several critical challenges in software development and deployment:

### The Dependency Hell Problem
Different projects often require **different versions** of the same libraries, runtimes, or system packages. For example:
- Project A needs Python 3.9 + NumPy 1.21
- Project B needs Python 3.11 + NumPy 1.26
- Manually installing these on the same OS frequently leads to conflicts.

### OS and Environment Mismatch
Finding one OS version that satisfies all dependency requirements (especially C libraries, system packages like `libssl`, `libpq`, etc.) is extremely difficult. This causes:
- "It works on my machine" syndrome
- Painful onboarding for new developers who must manually install dozens of dependencies
- Production deployment failures due to slight environment differences

### Solution Provided by Docker
Docker **packages the application together with all its dependencies** (code, runtime, libraries, configuration) into a portable unit that runs consistently anywhere.

**Example pain point (without Docker):**
```bash
# Developer 1
pip install django==3.2

# Developer 2 (different Python version or OS)
# → ImportError or cryptic compilation errors
```

With Docker, every developer and the production server run **exactly the same environment**.

---

## What Are Containers?

A **container** is an isolated environment that has:
- Its own **filesystem**
- Its own **network stack** (interfaces, IP addresses, routing tables)
- Its own **process tree** (PID namespace)
- Its own **mount points**

Containers **share the same host OS kernel**, unlike virtual machines that run a full guest OS.

This sharing makes containers much lighter (MBs instead of GBs) and faster to start (milliseconds vs minutes).

### Low-Level Container Technologies (Pre-Docker)

Docker did **not** invent containers. It built a user-friendly experience on top of existing Linux kernel features (namespaces + cgroups).

For a deep dive into LXC, LXD, LXCFS, runc, containerd, and CRI-O, see:
→ **[Low-Level Container Technologies](low-level-containers.md)**

**Key point**: These are **low-level** tools. Configuring them manually is complex. Docker provides a **high-level experience** (simple CLI, image format, registry integration, Dockerfile, etc.).

---

## Kernel Sharing on Linux, Windows, and macOS

### Linux
- Docker containers share the **host Linux kernel** directly.
- Most efficient and native experience.

### Windows & macOS
- Docker Desktop runs a **lightweight Linux VM** (using Hyper-V on Windows, HyperKit on macOS).
- Containers still share a Linux kernel — but that kernel runs inside the VM.
- Docker Desktop hides this complexity from the user.

This is why Docker requires virtualization support on non-Linux operating systems.

---

## Containers vs Virtual Machines

| Aspect | Containers | Virtual Machines |
|--------|------------|------------------|
| **Size** | MBs | GBs |
| **Startup Time** | Milliseconds | Minutes |
| **OS** | Share host kernel | Full guest OS |
| **Isolation** | OS-level (namespaces + cgroups) | Hardware-level |
| **Density** | Hundreds per host | Tens per host |
| **Performance** | Near-native | Slight overhead |

### What is a Hypervisor?

A **hypervisor** (also called a Virtual Machine Monitor) is software that creates and runs virtual machines.

- **Type 1 (Bare-metal)**: Runs directly on hardware (VMware ESXi, Microsoft Hyper-V, Xen).
- **Type 2 (Hosted)**: Runs on top of an existing OS (VirtualBox, VMware Workstation, Parallels).

Hypervisors emulate hardware so that each VM can run its own complete operating system.

Containers skip this hardware emulation layer by using kernel features instead.

---

## Public Docker Registry – Docker Hub

[Docker Hub](https://hub.docker.com) is the default public registry for Docker images.

### Key Features
- Free hosting for public images
- Official images maintained by Docker or vendors (`nginx`, `postgres`, `node`, `python`, etc.)
- Version tags (`postgres:15`, `node:20-alpine`)
- Automated builds from GitHub/GitLab
- Private repositories (paid plans)

### Example Usage
```bash
# Pull official images
docker pull nginx:alpine
docker pull postgres:15

# Run a container from an image
docker run -d --name mydb -e POSTGRES_PASSWORD=secret postgres:15
```

You can also push your own images:
```bash
docker tag myapp:latest username/myapp:latest
docker push username/myapp:latest
```

---

## Containers vs Images

These two terms are often confused.

| Concept | Description | Analogy |
|---------|-------------|---------|
| **Image** | Read-only template / blueprint. Contains the filesystem, dependencies, and instructions to run an application. | Class in OOP |
| **Container** | A **running instance** of an image. Has its own writable layer on top of the image. | Object / Instance |

### Key Differences

- You can create **many containers** from one image.
- Images are built in **layers** (each Dockerfile instruction adds a layer). This enables layer caching and efficient storage.
- When a container is deleted, the writable layer disappears. The original image remains unchanged.

### Example
```bash
# Image
docker images

# Create multiple containers from same image
docker run -d --name web1 nginx
docker run -d --name web2 nginx
docker run -d --name web3 nginx

# List running containers
docker ps
```

### Summary
- **Image** = static template
- **Container** = running process with isolated environment created from an image