# Cloning a Repos (Repository)
### Type the following into a your terminal: `git clone <the website of your repository>`
### Example: `git clone https://github.umn.edu/umn-csci-2081-s25/repo-akakp008.git`

# Cloning a Specific Branch
### Type the following into a your terminal: `git clone -b <branch name> <the website of your repository>`
### Example: `git clone -b firstBranch https://github.umn.edu/umn-csci-2081-s25/repo-akakp008.git`

# Checking the Status of Your Repo and What Files Git is Tracking
### Type the following into a your terminal while in the directory of your clonned repository: `git status`
### Example: `~/csci2081/My2081Stuff/repo-<YOUR-X500-HERE>: git status`

# Adding Files to Your Repo
### Type the following into a your terminal while in the directory of your clonned repository: `git add <file_name>`
### Example: `~/csci2081/My2081Stuff/repo-akakp008: git add <file_name>`

# Committing to Your Repo 
## Comitting locks in the changes you've made
### Type the following into a your terminal while in the directory of your clonned repository: `git commit -m “<a_message>"`
### Example: `~/csci2081/My2081Stuff/repo-akakp008: `git commit -m "This is my verry first cimmit!"`

# Creating a New Branch
## Oftentimes you will want to make changes to your code without the risk of losing your current working version. Don’t worry, git branches are here to save the day!
### Type the following into a your terminal while in the directory of your clonned repository: `it checkout -b <branch_name>`
>### This command does two things: creates the new branch of the given name, and then checks out the new branch, meaning you have moved from the primary branch to the new branch you just created.
### Example: `~/csci2081/My2081Stuff/repo-akakp008: git commit -m "This is my verry first cimmit!"`
## To see which branch you’re on, and to see the other branches available, use the following command. The branch you’re on will be indicated by an asterisk (*): `git branch`

# Pulling from Repo/Branch
## If multiple developers are pushing code to your repo, or you have made changes to your code outside your local machine, you will have to ‘pull’ the current version of the preferred branch to your machine.
### Type the following into a your terminal while in the directory of your clonned repository: `git pull`
### Example: `~/csci2081/My2081Stuff/repo-akakp008: git pull`

