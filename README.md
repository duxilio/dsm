```
Usage: dsm [add | rm | show | update | pull | push] [args...]

COMMANDS
	add <reference> <secret>	encrypts and adds a secret to the manager
	rm <reference>				removes a secret from the manager
	show [<reference>]			either shows all encrypted secrets or decrypts and shows a secret
	update						updates the CLI if an update is available
	pull						git pulls from the remote secrets repo
	push						git pushes to the remote secrets repo

ENV vars
	DSM_PASSWORD				the master password
	DSM_REMOTE_SECRETS_PATH		the path to the remote secrets repo
```

### Global Installation
If you would like to be able to globally use the `dsm` command then you can install it globally using `npm`.
```
sudo npm i -g https://github.com/duxilio/dsm-cli.git
```

Then whenever you need to update the CLI simply run `dsm update`.

### Setup
In order to use the secrets manager you need to configure your master password and the path to the remote secrets git repository. The easiest way to do this is by adding these enviourment variables to your `rc` file.
```
export DSM_PASSWORD="123"
export DSM_REMOTE_SECRETS_PATH="user@server:/path/to/dsm-secrets.git"
```

### Secrets Git Repository
The remote secrets repository is there so you and your colleges are able to sync the passwords between computers. We like to keep the repository in a place as secure as possible by simply creating a barebone Git repo on a server. To create such a repo run the following command in the location where you would like to create the repo on your server.
```
mkdir dsm-secrets.git && cd dsm-secrets.git
git init --bare
```

Now make sure your local enviourment variables are set up to be able to sync with this repo.
```
export DSM_REMOTE_SECRETS_PATH="user@server:/path/to/dsm-secrets.git"
```

In case your server doesn't have Git you can also create the repo locally and then `scp` or `rsync` it to your server.
