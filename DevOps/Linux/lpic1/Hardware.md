# Hardware, Firmware & System Initialization

This document provides a comprehensive overview of computer hardware, firmware, and how the Linux operating system interacts with them — essential knowledge for the LPIC-1 certification.

---

## What is Firmware?

**Firmware** is a type of software that is permanently stored in non-volatile memory (ROM, EEPROM, Flash) on hardware devices. It provides low-level control over the hardware and acts as an intermediary between the hardware and the operating system.

### Key Characteristics:
- **Non-volatile**: Survives power loss
- **Low-level**: Runs before the OS loads
- **Hardware-specific**: Tailored to the device it controls
- **Updatable**: Modern firmware can usually be updated (flashing)

### Examples:
- BIOS/UEFI on motherboards
- Microcode in CPUs
- Firmware in network cards, SSDs, GPUs, routers

---

## BIOS as Firmware

**BIOS** (Basic Input/Output System) is the traditional firmware interface between the hardware and the operating system on x86 systems.

### How BIOS Works

1. **POST (Power-On Self-Test)**: When the computer is powered on, BIOS performs hardware checks (memory, keyboard, storage, etc.)
2. **Hardware Initialization**: Initializes CPU, RAM, chipsets, and peripheral devices
3. **Boot Device Selection**: Looks for a bootable device in the order configured in BIOS setup
4. **Bootloader Loading**: Loads the MBR (first 512 bytes) from the boot device
5. **Handover to OS**: Transfers control to the bootloader → OS

### BIOS Setup
- Accessed usually by pressing `Del`, `F2`, `F10`, or `Esc` during boot
- Contains settings for boot order, overclocking, virtualization, security, etc.

---

## MBR vs GPT

### MBR (Master Boot Record)
- Located in the **first 512 bytes** of a hard disk
- Contains:
  - Bootloader code (first 446 bytes)
  - Partition table (4 primary partitions max)
  - Disk signature
- Maximum disk size: **2 TiB**
- Maximum 4 primary partitions (or 3 primary + 1 extended)

### GPT (GUID Partition Table)
- Part of the **UEFI** specification
- Uses **GUIDs** (128-bit identifiers) for partitions
- Supports up to **128 partitions** by default
- Maximum disk size: **8 ZiB** (theoretically)
- More robust (CRC32 checksums, backup partition table)

### Comparison Table

| Feature                  | MBR                          | GPT                              |
|--------------------------|------------------------------|----------------------------------|
| Max disk size            | 2 TiB                        | 8 ZiB                            |
| Max partitions           | 4 (primary)                  | 128 (default)                    |
| Bootloader location      | First 512 bytes              | EFI System Partition             |
| Compatibility            | BIOS + UEFI                  | Primarily UEFI                   |
| Redundancy               | None                         | Backup table + CRC               |
| Linux support            | Excellent                    | Excellent                        |

### BIOS + Disk Relationship
- **BIOS** only understands **MBR**
- If you use GPT with BIOS, you need a **BIOS boot partition** (1 MiB, no filesystem) for GRUB
- UEFI systems prefer GPT and use the **EFI System Partition (ESP)** formatted as FAT32

---

## Evolution: BIOS → EFI → UEFI

### Timeline
- **1980s–2000s**: BIOS (legacy 16-bit, limited)
- **1990s–2010s**: **EFI** (Extensible Firmware Interface) developed by Intel
- **2007+**: **UEFI** (Unified EFI) – industry standard (2.0+)

### UEFI Advantages over BIOS
- 64-bit architecture
- Mouse support in setup
- Secure Boot
- Faster boot times
- Larger boot volumes
- Network boot capabilities
- Modular driver model

### Modern Reality
Most "BIOS" settings in modern motherboards are actually **UEFI** with a legacy BIOS compatibility mode (CSM - Compatibility Support Module).

---

## How the OS Boots & Hardware Connects to Software

### Boot Sequence (UEFI example)
1. **UEFI Firmware** initializes hardware
2. **UEFI Boot Manager** loads `BOOTX64.EFI` from ESP
3. **Bootloader** (GRUB2, systemd-boot) loads kernel + initramfs
4. **Kernel** initializes drivers, mounts root filesystem
5. **init** system (systemd) starts userspace services

### Hardware ↔ Software Connection Layers

| Layer              | Examples                     | Purpose                              |
|--------------------|------------------------------|--------------------------------------|
| Firmware           | BIOS/UEFI                    | Hardware initialization              |
| Kernel             | Device drivers               | Direct hardware control              |
| Userspace          | udev, sysfs, /proc           | Abstraction & configuration          |
| Applications       | `lsusb`, `lspci`, `hdparm`   | User interaction                     |

---

## PCI (Peripheral Component Interconnect)

PCI is a hardware bus standard for connecting internal devices.

### Types:
- **PCI** (original 32-bit/33 MHz)
- **PCI-X** (enhanced)
- **PCIe** (PCI Express) – current standard (serial, point-to-point)

### Key Concepts:
- **BUS/DEV/FN** addressing (e.g., `00:1f.2`)
- **IRQs** for interrupts
- **BARs** (Base Address Registers) for memory-mapped I/O

### Linux Commands:
```bash
lspci -nnk          # Show devices + kernel drivers
lspci -t            # Show PCI tree
lspci -vv           # Verbose output
```

---

## Storage Technologies

### HDD Evolution

| Interface | Full Name                          | Characteristics                     | Max Speed     |
|-----------|------------------------------------|-------------------------------------|---------------|
| **PATA**  | Parallel ATA (IDE)                 | 40/80-wire ribbon cable, master/slave | 133 MB/s     |
| **SATA**  | Serial ATA                         | Point-to-point, hot-plug capable    | 6 Gb/s (SATA3) |
| **SCSI**  | Small Computer System Interface    | Enterprise, multi-device, tagged queuing | High        |
| **SAS**   | Serial Attached SCSI               | Modern enterprise replacement       | 12–24 Gb/s   |
| **NVMe**  | Non-Volatile Memory Express        | PCIe-based SSDs                     | 3–14+ GB/s   |

### Linux Detection:
```bash
lsblk
cat /proc/scsi/scsi
dmesg | grep -i sata
```

---

## RJ-45 Network Cable

- Standard connector for **Ethernet** (8P8C modular connector)
- Used with **twisted pair** cables (Cat5e, Cat6, Cat6a, Cat7)
- Supports speeds from 100 Mbps to 10 Gbps+
- Pinout follows **T568A** or **T568B** standards

### Linux Tools:
```bash
ethtool eth0
ip link show
mii-tool
```

---

## USB (Universal Serial Bus)

### Versions & Speeds:
| Version   | Speed          | Year |
|-----------|----------------|------|
| USB 1.1   | 12 Mbps        | 1998 |
| USB 2.0   | 480 Mbps       | 2000 |
| USB 3.0   | 5 Gbps         | 2008 |
| USB 3.1   | 10 Gbps        | 2013 |
| USB 3.2   | 20 Gbps        | 2017 |
| USB4      | 40 Gbps        | 2019 |

### Key Features:
- Hot-plugging
- Power delivery (up to 240W in USB4)
- Multiple device tiers (hubs)

### Linux Commands:
```bash
lsusb -t
usb-devices
dmesg | grep usb
```

---

## GPIO (General Purpose Input/Output)

GPIO pins are used for low-level hardware control, especially on:
- Raspberry Pi
- Embedded Linux devices
- IoT boards

### Linux Interface:
```bash
/sys/class/gpio/          # Legacy interface
libgpiod / gpiod tools    # Modern recommended tools
```

### Example (libgpiod):
```bash
gpioinfo
gpioset gpiochip0 17=1
gpioget gpiochip0 17
```

---

## Linux Pseudo Filesystems

These virtual filesystems expose kernel and hardware information to userspace.

### `/sys` and `sysfs`

- Mounted at `/sys`
- Provides structured view of devices, drivers, and kernel objects
- Uses kobject/kset model

```bash
/sys/class/net/           # Network interfaces
/sys/block/               # Block devices
/sys/bus/pci/             # PCI devices
/sys/firmware/efi/        # UEFI variables
```

### `udev`

- Device manager for the Linux kernel
- Creates device nodes in `/dev` dynamically
- Uses rules in `/etc/udev/rules.d/`

```bash
udevadm monitor --udev
udevadm info -q all -n /dev/sda
```

### D-Bus

- **D-Bus** is an inter-process communication (IPC) system
- Used by systemd, NetworkManager, udisks, etc.
- Two buses:
  - System bus (`--system`)
  - Session bus (`--session`)

```bash
busctl
dbus-send
```

### `/proc` Filesystem

Virtual filesystem exposing runtime kernel data.

#### Useful Entries:

| File/Path                    | Content                              | Example Command                  |
|-----------------------------|--------------------------------------|----------------------------------|
| `/proc/interrupts`          | IRQ assignments                      | `cat /proc/interrupts`           |
| `/proc/ioports`             | I/O port ranges                      | `cat /proc/ioports`              |
| `/proc/dma`                 | DMA channels                         | `cat /proc/dma`                  |
| `/proc/cpuinfo`             | CPU details                          | `cat /proc/cpuinfo`              |
| `/proc/meminfo`             | Memory usage                         | `cat /proc/meminfo`              |
| `/proc/net/`                | Network statistics & config          | `cat /proc/net/dev`              |
| `/proc/<pid>/`              | Per-process information              | `cat /proc/1/status`             |
| `/proc/cmdline`             | Kernel boot parameters               | `cat /proc/cmdline`              |
| `/proc/modules`             | Loaded kernel modules                | `cat /proc/modules`              |

---

## Summary

This document covered the full hardware-to-software stack relevant to LPIC-1:

- Firmware (BIOS/UEFI)
- Disk partitioning (MBR/GPT)
- Hardware buses (PCI, USB, storage interfaces)
- Linux interfaces (`/proc`, `sysfs`, `udev`, D-Bus)
- Low-level hardware (GPIO, networking)

Understanding these layers helps system administrators troubleshoot hardware issues and manage Linux systems effectively.
