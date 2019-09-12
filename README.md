##How to use git and github in our project?

1. Someone create a project repository, This is our public repository. Now it has only one branch: Master.
2. Other members use their account fork this repository in github.
3. clone repository of yourselves to your local computer:
``git clone 'here is the url of your repository'`` url has no quotation: ' '.
4. Add remote upstream repository, which is our public repository:
<<<<<<< HEAD
``git remote add upstream 'public repository url'``
=======
``add remote add upstream 'public repository url'``
>>>>>>> 017d7f47b90092a321324195620ccd0903202c61
Check if it is there:
``git remote -v``
5. Now fetch files from upstream repository:
``git fetch upstream``
Now upstream repository become one of your branch, named:upstream/master.
Merge upstrem/master to your master branch:
``git checkout master`` ---This switch to your master.
``merge --no-ff upstream/master`` Merge upstream/master branch to your master branch. '--no-ff' means 'no faster forward', this way will make your master branch workflow more clear.
Now your master branch is the latest public master branch. You can push it to your github repository :
```
git add --all
git commit -m 'updating from upstream repository'
git push -u origin master
```
You should update your master branch from public master branch by above steps when public master got changed, so that when you finish your job, you can check if your job works under latest project version.

6. Now create your branch for specific task, for example: feature-name:
``git branch feature-name``
Switch to new branch:
``git checkout feature-name``
Now you start your job. When you are done, make sure you are under your branch:
``git branch`` ---The branch you are working on will have a *
or ``git status``---This will tell you which branch you are  on.
Then add and commit your change to your repository:
```
git add --all
git commit -m 'some necessary message'
```
Then **merge your master to your branch:**
```
git checkout feature-name
git rebase feature-name
```
to check if any conflict, if yes, resolve conflict and make sure your feature also works.

7. After solve all the conflicts, push your branch to your github repository:
```
git push -u origin feature-name
```
 then you can start a 'pull request' for this branch, asking our public repository owner to review your new code, if pass, your branch will be got into public repository as a branch. Public repository owner can emerge this branch to public master branch. (At this time, everyone should do step 5 to update their own master branch).
Don't wait for a long time or a lot of code to do 'pull request', because reviewing you code is gonna be tough. One member will have many features to do. Once you've done one feature or one page, you do 'pull request' one time.

8. For public repository owner, doesn't need to fork and update upstream master branch, but he should create a branch of him selves.
Every time he does 'merge --no-f' operation, to merge other branch to master branch. If everyone does step 6 correctly, it should be no conflict.
After finish each sprint, we should give this master branch a 'tag':
```
git checkout master
git tag v1.0
git push origin --tags
```


##Project Question
1. Our team has only two members, OK?
2. How to build documentation for this project? What kind of documentation we must have? What's that like?
3. What kind of software development model we should use? Waterfall, Incremental.
4. CI: Continue Integration, do we need CI in our project? How to do it?
5. What does 'testing infrastructure and continuous integration infrastructure' mean? How to do test? Unit test, Integration test.
<<<<<<< HEAD
6. What're the features our web app should have? Creating channels, Joining channels, sending message to channels?

some test
=======
6. What're the features our web app should have? Creating channels, Joining channels, sending message to channels?
>>>>>>> 017d7f47b90092a321324195620ccd0903202c61
