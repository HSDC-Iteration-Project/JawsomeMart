# JawsomeMart

This is for a SPA (Single Page Application) e-commerce solution that uses [Vite](https://vite.dev) and the MERN stack.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Use the `.env` to configure environment variables. Change the JWT_SECRET to what you want. Eg:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

## Developer Workflow

The main branch is only for production. Developers will work only in the dev branch. The following workflow goes through the process of creating a feature branch through submitting the pull request.

```
# Start in the dev branch
git checkout dev

# Sync latest dev branch changes from GitHub dev (from other developers) into your local dev repo
git pull origin dev

# Create your feature branch, this will alo switch you into your new feature branch
git checkout -b [your-name/feature-name]

# Work on your new feature files and when you are ready at least stages all of the changes you've made before proceeding 
# At this point in the workflow, you are ready to push your new feature branch to the GitHub. Before doing that you need
# to sync with the GitHub dev branch to bring your local repo up to date with the latest changes. Go back to the dev branch.
git checkout dev

# Sync any changes from GitHub dev to bring your local dev up to date
git pull origin dev

# Now go back to your feature branch
git checkout [your-name/feature-name]

# Now merge any changes that have happened in the dev branch into your feature branch
# This is where merge conflict may occur
# You will have to resolve any/all merge conflicts, but hopefully there are none 
git merge dev

# After merging and resolving any conflict you can push your feature branch to GitHub
git push origin dev

# At this point your feature branch should be GitHub and you will need to create a pull request
# so that your feature branch can be merged into the GitGub dev branch
# The pull request is necessary so that GitHub dev gets your feature changes and other developers
# can pickup your changes.
#
# repeat as needed, happy coding!!
```
