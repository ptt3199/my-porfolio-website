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

A **minimal CLI tool written in Go** to automate the setup of a personal Ubuntu server for backend development. This project emerged from my need to **convert an old laptop into a development server** and provides an interactive interface to install essential packages like SSH, Docker, tmux, and other development tools.

## Key Features

### Interactive CLI Experience
- **Menu Navigation**: Choose between different installation categories
- **Selective Installation**: Pick specific tools instead of installing everything
- **Progress Feedback**: Real-time installation progress with emoji indicators
- **Flexible Selection**: Install single tools, multiple tools, or everything with `1 2 3` or `all` syntax

### Tool Support
- **System Tools**: tmux, git, curl, htop, ufw, zsh
- **Docker Stack**: Complete Docker installation with Engine, CLI, Buildx, Compose, and user configuration
- **SSH Server**: Secure remote access setup

## Technical Implementation

### Go Benefits
- **Fast Execution**: Compiled binary with minimal startup overhead
- **Cross-Platform**: Native builds for Linux x86_64, ARM64, and macOS
- **Single Binary**: No dependencies or runtime requirements
- **Memory Efficient**: <10MB usage during execution

### Development Learnings
Through this project, I gained experience with:
- **Go CLI Development**: Cobra framework and command patterns
- **GoReleaser**: Modern release management with multi-platform builds
- **Package Distribution**: DEB/RPM packages and GitHub releases
- **Cross-compilation**: Targeting multiple platforms from single codebase

## Usage Example

```bash
🚀 Server Setup CLI
Choose an option:
1. Install accessories
2. Install Docker
3. Exit
Enter your choice (1-3): 1

Choose accessories to install:
1. tmux  2. git  3. curl  4. htop  5. ufw  6. zsh
Enter numbers (e.g. 1 3 5) or 'all': 1 3 5

Installing tmux... ✅ Done
Installing curl... ✅ Done
Installing ufw... ✅ Done
```

## Release Management

Each release provides multi-platform support:
- **Linux**: x86_64 and ARM64 builds
- **macOS**: Intel and Apple Silicon builds  
- **Packages**: DEB and RPM for Linux distributions
- **Checksums**: SHA256 verification for security

## Project Context

This tool addresses the workflow of **converting old hardware into development servers** by:
- Reducing manual setup time from hours to minutes
- Ensuring consistent environment across server instances
- Codifying server setup knowledge for future reference
- Providing reliable, repeatable configuration process

## Links

- **Repository**: [github.com/ptt3199/setup-server-go-cli](https://github.com/ptt3199/setup-server-go-cli)
- **Latest Release**: [GitHub Releases](https://github.com/ptt3199/setup-server-go-cli/releases/latest)

This project represents my journey into **Go development** and **CLI tool creation**, while solving the real-world problem of efficient server setup automation.
