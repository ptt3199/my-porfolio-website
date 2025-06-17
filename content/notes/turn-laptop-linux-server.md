# Turn My Old Laptop Into A Linux Server
- I have an old laptop that I'm not using.
- I want a linux server to host my projects.
- I want to learn more about linux, devops, and cloud computing.

## Information
### Hardware 
- Laptop: Dell Latitude 3500
- Processor: Intel Core i5-8265U 1.6GHz turbo 3.9GHz
- RAM: 12GB DDR4 2400MHz
- Storage: 256GB SSD SATA

### Software
- Linux: Ubuntu 22.04 Server LTS
- Docker: 24.0.0

## Setup

### Operating System

Ubuntu 24.04 Server LTS: No GUI, lightweight, fast, secure, and reliable.

Installation: 

- Download from [Ubuntu](https://ubuntu.com/download/server)
- Create a bootable USB drive with [Rufus](https://rufus.ie/) ([Balena Etcher for Mac](https://etcher.balena.io/#download-etcher))
- Boot from the USB drive
- Follow the installation instructions

Software:

- SSH: `sudo apt install openssh-server` (normally it's installed when setup Ubuntu Server)
- Accesories: `sudo apt install tmux git curl htop ufw` (May be zsh, too)
- Docker: 
  - [Install the engine and compose] (https://docs.docker.com/engine/install/ubuntu/)
  - Allow docker to run without sudo: `sudo usermod -aG docker $USER`

### Get a domain

I buy a domain name from [Matbao] (https://www.matbao.net/)



### Cloudflare Tunnel

This is a simple way to get a public IP address for your server.
- 100% free, no time limit
- Create a authenticated tunnel from your server to Cloudflare
- Could connect to your own domain name
- High security (TLS, firewall, etc.)

Installations on server:
- Install:
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```
- Login:
```bash
cloudflared tunnel login
```
- Create a tunnel and save `Tunnel ID`
```bash
cloudflared tunnel create <tunnel-name>
```






