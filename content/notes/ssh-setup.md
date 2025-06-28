# SSH Setup

## 1. SSH by username and password

### 1. Server side
#### 1.1 Install OpenSSH
```bash
sudo apt update
sudo apt install openssh-server
```

#### 1.2 Enable SSH service
```bash
sudo systemctl enable ssh
```

#### 1.3 Check the status
```bash
sudo systemctl status ssh
```
#### 1.4 Check the port 22 is open
```bash
sudo netstat -tuln | grep :22
```

#### 1.5 (Optional) Get server info
- Get server IP
  ```bash
  hostname -I
  ```
  or 
  ```bash
  ip addr show eth0 | grep inet | awk '{print $2}' | cut -d/ -f1
  ```
- Show username
  ```bash
  whoami
  ```

### 2. Client side
#### 2.1 Install OpenSSH
```bash
sudo apt update
sudo apt install openssh-client
```

#### 2.2 SSH into the server by username and password
```bash
ssh username@server_ip
```

We done here. But this will prompt for password every time. We can use SSH key to avoid this.

## 2. SSH by private key

We do all the setup on option 1. Now we will use SSH key to avoid password prompt.

### 1. Server side
#### 1.1 Generate SSH key
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### 1.2 Copy the public key to the server
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub username@server_ip
```

#### 1.3 Check the public key is copied
```bash
cat ~/.ssh/authorized_keys
```

#### 1.4 Save the SSH alias to config 
```bash
sudo nano ~/.ssh/config
```

Add the following to the config file:
```bash
Host <your_alias>
  HostName server_ip
  User username
  IdentityFile ~/.ssh/id_rsa
```

(Optional) If you use the Cloudflare Tunnel, you can use the following config:
```bash
Host <your_alias>
  HostName server_ip
  User username
  IdentityFile ~/.ssh/id_rsa
  ProxyCommand cloudflared access ssh --hostname %h
```

Check SSH:
```bash
ssh <your_alias>
```



### 2. (Optional) Server side
I often turn off SSH by password when keyfile setup is done. This is more secure.

Open SSH config file:
```bash
sudo nano ~/.ssh/config
```

Change the following line. Some are commented out.
If use nano, use `Ctrl + W` to search.
```bash
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM no
```

Restart SSH service:
```bash
sudo systemctl restart ssh
```

Check SSH after comment out `IdentityFile` (and also `ProxyCommand` if you use Cloudflare Tunnel) in config file:
```bash
ssh <your_alias>
```