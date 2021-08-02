# BetterTodoApp

Made with: JS, CSS, Html, Npm, Webpack, Babel, Dayjs , [Hamburger](https://jonsuh.com/hamburgers/#usage)

# [Link](https://toan95dn.github.io/BetterTodoApp/)

## How to use:

### Log in:

- Log in with google
- Sign up then log in with email and password
- Log in with Demo (Data won't be saved after you log out)

### Main content

- Click the '+' icon to add a task or a project.
- Click the edit icon on a task so that you can change its information as well as moving the task to another project.
- Check the box to mark a task as done.
- Click on the trash can icon to remove a task.
- Click the Duedate with the icon to sort the due date of tasks.
- Check the priority of tasks : red (high), medium (yellow), low (green)

### Side bar menu

- Click 'Home' to show all tasks.
- Click 'Inbox' to show all tasks that don't have a specific project name (Tasks that are not in the project container).
- Click 'Today' to show all tasks that are due today.
- Click 'Week' to show all tasks that are due this week.

### Project container (inside side bar menu)

- The number before each project shows the number of tasks the project have, these numbers will be updated when you delete/add/move a task.
- Click to the project name to show all tasks of the project.
- Click the trash can icon then click confirm to remove a project, which also removes all tasks in the project.

## What I've learn in this project:

- Incorperating firebase to manage users and data.
- Model View Controller
- Pubsub design pattern [Link](https://www.youtube.com/watch?v=nQRXi1SVOow)
- Check compatibility before applying new JS features (In this project, my page did not render on IOS device because they still have not supported
  private methods inside classes yet, took me a while to figure out)
- Asynchronous JavaScript
