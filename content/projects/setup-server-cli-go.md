---
name: "Setup Server CLI Go"
description: "A minimal CLI tool written in Go to automate the setup of a personal Ubuntu server for backend development. It installs essential packages like SSH, Docker, tmux, and configures a secure environment for development — all through an interactive command-line interface."
link: "https://github.com/ptt3199/setup-server-go-cli"
status: "completed"
featured: true
startDate: "2025-06-17"
endDate: "2025-06-17"
technologies: ["Go", "CLI", "Docker", "Ubuntu", "Linux", "GoReleaser", "SSH", "tmux", "GitHub Actions", "Shell Scripts"]
category: "devops-tools"
highlights:
  - "Interactive CLI with selective tool installation for customized server setup"
  - "Complete Docker installation with all plugins and proper user configuration"
  - "Multi-platform builds with GoReleaser for Linux x86_64, ARM64, and macOS platforms"
  - "Automated release management with GitHub Actions and comprehensive package distribution"
  - "Essential development tools installation including tmux, git, curl, htop, ufw, and zsh"
  - "Built as part of a larger project to convert old laptop into a personal development server"
---

# Setup Server CLI Go

A **minimal CLI tool written in Go** to automate the setup of a personal Ubuntu server for backend development. This project emerged from my need to **convert an old laptop into a development server** and provides an interactive interface to install essential packages like SSH, Docker, tmux, and other development tools — all in one streamlined process.

## Project Context

This CLI tool was created as part of a larger initiative to **turn my old laptop into a personal development server**. Instead of manually installing and configuring each tool every time I set up a new server environment, I built this automated solution to handle the repetitive setup tasks efficiently.

## Key Features

### 🎯 Interactive CLI Experience
- **Main Menu Navigation**: Choose between different installation categories
- **Selective Installation**: Pick specific tools to install rather than everything at once
- **Progress Feedback**: Real-time installation progress with emoji indicators
- **Return to Menu**: Continue installing additional tools after each operation completes
- **Multiple Selection**: Install single tools, multiple tools, or everything with flexible input options

### 📦 Comprehensive Tool Support

#### System Accessories
- **tmux** - Terminal multiplexer for session management and persistent sessions
- **git** - Version control system for development workflows
- **curl** - Command line tool for data transfer and API testing
- **htop** - Interactive process viewer for system monitoring
- **ufw** - Uncomplicated Firewall for security configuration
- **zsh** - Advanced shell with improved features over bash

#### Services & Runtime
- **SSH Server** - Secure remote access configuration (openssh-server)
- **Docker Complete Stack** - Comprehensive Docker installation including:
  - Docker Engine (Community Edition)
  - Docker CLI tools
  - containerd.io runtime
  - Docker Buildx Plugin for multi-platform builds
  - Docker Compose Plugin for orchestration
  - Automatic user addition to docker group for non-root usage

## Technical Architecture

### Go Implementation Benefits
- **Fast Execution**: Compiled binary with minimal startup overhead
- **Cross-Platform**: Native builds for Linux x86_64, ARM64, and macOS
- **Single Binary**: No dependencies or runtime requirements
- **Concurrent Operations**: Goroutines handle multiple installations efficiently
- **Memory Efficient**: Low resource usage compared to interpreted languages

### CLI Design Patterns
- **Command Pattern**: Modular command structure with root, accessories, and docker commands
- **Interactive Prompts**: User-friendly input handling with validation
- **Error Handling**: Comprehensive error checking and user feedback
- **Progress Indication**: Visual feedback during long-running operations

## Development Learnings

### Go CLI Development
Through this project, I gained hands-on experience with:
- **Cobra Framework**: Building structured CLI applications with subcommands
- **Cross-compilation**: Targeting multiple platforms from single codebase
- **Package Management**: Go modules and dependency management
- **Error Handling**: Go's explicit error handling patterns
- **Testing**: Unit testing CLI functionality and command execution

### GoReleaser Integration
This project taught me about **modern Go release management**:
- **Automated Builds**: Multi-platform binary generation
- **GitHub Releases**: Automatic release creation with changelogs
- **Package Distribution**: DEB and RPM packages for Linux distributions
- **Archive Management**: Properly named tar.gz files with checksums
- **Release Workflows**: Integration with GitHub Actions for CI/CD

## Usage Examples

### Interactive Mode
```bash
🚀 Server Setup CLI
Choose an option:
1. Install accessories
2. Install Docker
3. Exit
Enter your choice (1-3): 1

Choose accessories to install:
1. tmux
2. git
3. curl
4. htop
5. ufw
6. zsh
Enter the number of the accessory to install (e.g. 1, 2, 3, etc.) or 'all' to install all accessories: 1 3 5

Installing tmux...
✅ Done: sudo apt-get install -y tmux
Installing curl...
✅ Done: sudo apt-get install -y curl
Installing ufw...
✅ Done: sudo apt-get install -y ufw
Accessories installed successfully

✅ Press Enter to return to main menu...
```

### Flexible Selection Options
- **Single Tool**: `1` - Install tmux only
- **Multiple Tools**: `1 2 3` - Install tmux, git, and curl
- **Everything**: `all` - Install all available accessories
- **Menu Navigation**: Return to main menu for additional installations

## Release Management

### Multi-Platform Distribution
Each release provides comprehensive platform support:
- **Linux x86_64**: `setup-server-cli_Linux_x86_64.tar.gz` - Standard servers
- **Linux ARM64**: `setup-server-cli_Linux_arm64.tar.gz` - Raspberry Pi, ARM servers
- **macOS Intel**: `setup-server-cli_Darwin_x86_64.tar.gz` - Intel Macs
- **macOS Apple Silicon**: `setup-server-cli_Darwin_arm64.tar.gz` - M1/M2 Macs
- **Debian Packages**: `.deb` files for Ubuntu/Debian systems
- **RedHat Packages**: `.rpm` files for CentOS/RHEL systems
- **Checksums**: SHA256 verification for security

### Build Process
```bash
# Development builds (local testing)
./build-cli.sh

# Release candidate (testing)
./build-cli.sh release snapshot

# Tagged release (production)
git tag v1.0.0
git push origin v1.0.0
./build-cli.sh release
```

## Personal Server Setup Context

This tool specifically addresses the workflow of **converting old hardware into development servers**:

1. **Hardware Repurposing**: Transform unused laptops into useful development infrastructure
2. **Consistent Environment**: Ensure identical setup across multiple server instances
3. **Time Efficiency**: Reduce manual setup time from hours to minutes
4. **Documentation**: Codify server setup knowledge for future reference
5. **Reproducibility**: Reliable, repeatable server configuration process

## Technical Specifications

### System Requirements
- **Ubuntu/Debian** based Linux distribution
- **Sudo privileges** for package installation
- **Internet connection** for downloading packages
- **Architecture**: Supports x86_64 and ARM64 platforms

### Performance Characteristics
- **Binary Size**: ~5MB compiled binary
- **Memory Usage**: <10MB during execution
- **Installation Speed**: Parallel package installation where possible
- **Error Recovery**: Graceful handling of package installation failures

## Future Enhancements

### Planned Features
- **Cloudflare Tunnel Setup**: Automated tunnel configuration for secure public access
- **Zsh Configuration**: Oh My Zsh installation and theme setup
- **Nginx Installation**: Web server setup with basic configuration
- **SSL Certificate Management**: Let's Encrypt integration for HTTPS
- **Firewall Rules**: Advanced ufw configuration for specific services
- **User Management**: Development user creation and SSH key setup

### Extended Use Cases
- **Docker Container Environment**: Automated container-based development setup
- **Database Installation**: PostgreSQL, MySQL, Redis installation options
- **Development Languages**: Node.js, Python, Java environment setup
- **Monitoring Tools**: System monitoring and alerting configuration

## Project Links

- **Live Repository**: [github.com/ptt3199/setup-server-go-cli](https://github.com/ptt3199/setup-server-go-cli)
- **Latest Release**: [GitHub Releases](https://github.com/ptt3199/setup-server-go-cli/releases/latest)
- **Documentation**: Comprehensive README with installation and usage guides

This project represents my journey into **Go development** and **CLI tool creation**, while solving a real-world problem of efficient server setup automation. The combination of interactive design, comprehensive tool support, and professional release management makes it a solid foundation for my server infrastructure needs.
