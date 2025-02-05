# **Mini Project Management Tool** 🎯

_A scalable and intuitive project management tool for teams to create, assign, and track tasks with real-time updates, role-based access control, and a Kanban board._

---

- **Dark Mode**

  ![Dark Mode](public/dark-task-flow-screenshot.png)

- **Light Mode**

  ![Light Mode](public/light-task-flow-screenshot.png)

<details>
  <summary>📜 Table of Contents</summary>

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Usage Guide](#usage-guide)
6. [API Endpoints](#api-endpoints)
7. [Architecture & Scalability](#architecture--scalability)
8. [Performance Optimizations](#performance-optimizations)
9. [Roadmap & Future Improvements](#roadmap--future-improvements)
10. [Contributing](#contributing)

</details>

---

## 🎯 **Features**

### ✅ **User Management**

- User registration & login (mock API).
- **Role-based access control (RBAC)**:
  - **Admin**: Manage users, projects, tasks.
  - **Project Manager**: Manage projects & tasks.
  - **Team Member**: View & update assigned tasks.

### ✅ **Project Management**

- Create, update, delete projects.
- Assign **team members** to projects.
- Track **project status** (Planned, In Progress, Completed).
- **Start & End Date selection**.

### ✅ **Task Management**

- Each project has tasks with:
  - Title, Description, Assigned Member, Status.
- Task **statuses**: To Do, In Progress, Done.

### ✅ **Kanban Board**

- Drag & Drop functionality to manage task statuses.
- Task filtering by status, priority, and members.

### ✅ **Dashboard & Reporting**

- Summary of:
  - **Total Projects**
  - **Total Tasks**
  - **Task Status Distribution** (chart visualization).

### ☑️ **Real-Time Features**

- **Live task updates** via WebSockets.
- **Notifications** for task assignments.

### ☑️ **Advanced Features**

- **Optimistic UI updates**.
- **Offline support** (Service Workers).
- **Progress tracking (Gantt Chart)**.
- **Custom hooks for API calls**.

---

## 🛠 **Tech Stack**

### **Frontend**

- ⚛️ React.js + TypeScript
- 🎨 Tailwind CSS / SCSS
- 🏗 Zustand (State Management)
- 🔄 React Query (API caching)

### **Backend**

- 🛠 JSON Server + JSON Server Auth (Mock API)

### **Tools & Deployment**

- 🚀 Vercel (Frontend)
- ☁️ Render (Mock API)

---

## 🚀 **Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/project-management-tool.git
cd project-management-tool
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Run Backend (Mock API on JSON Server)**

```bash
npm run server
```

### **4️⃣ Run Frontend**

```bash
npm start
```

💡 By default, the app runs on `http://localhost:3000` and the API on `http://localhost:5000`.

---

## 📖 **Usage Guide**

### 🔑 **User Roles & Permissions**

| Role            | Can Manage Users | Can Manage Projects | Can Manage Tasks   |
| --------------- | ---------------- | ------------------- | ------------------ |
| Admin           | ✅               | ✅                  | ✅                 |
| Project Manager | ❌               | ✅                  | ✅                 |
| Team Member     | ❌               | ❌                  | ✅ (Only Assigned) |

### 📊 **Managing Projects**

1. **Create a Project**: Navigate to Projects → Click **"New Project"**.
2. **Assign Team Members**: Select users from the dropdown.
3. **Set Deadlines**: Choose start & end dates.
4. **Update Status**: Mark projects as **Planned, In Progress, Completed**.

### 🎯 **Managing Tasks**

1. **Create a Task** under a project.
2. Assign **team members**.
3. Drag & Drop tasks in the **Kanban board** to change status.

---

## 🔗 **API Endpoints**

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | Register a new user  |
| POST   | `/auth/login`    | User login           |
| GET    | `/projects`      | Fetch all projects   |
| POST   | `/projects`      | Create a new project |
| GET    | `/tasks`         | Fetch all tasks      |
| PATCH  | `/tasks/:id`     | Update a task        |

📖 **Full API Documentation**: [Swagger Link](#)

---

## 🏗 **Architecture & Scalability**

### **Folder Structure**

```
/src
  ├── /components      # Reusable UI Components
  ├── /pages           # Page Components
  ├── /hooks           # Custom Hooks
  ├── /services        # API Calls
  ├── /stores          # Zustand State Management
  ├── /utils           # Helper Functions
```

### **Scalability Considerations**

- **Component-based architecture** for reusability.
- **Custom Hooks** to avoid prop drilling.
- **Role-Based Access Control (RBAC)**.
- **WebSockets for real-time updates**.
- **Lazy loading & code splitting** for performance.

---

## ⚡ **Performance Optimizations**

✅ React Query for **caching API calls**.  
✅ **Lazy loading** & **code-splitting** with `React.lazy()`.  
✅ **Memoization** using `React.memo`, `useCallback`, `useMemo`.  
✅ **Optimistic UI updates** for instant feedback.

---

## 🛤 **Roadmap & Future Improvements**

🔹 **Advanced Filtering & Sorting**.  
🔹 **Dark Mode Improvements**.  
🔹 **Mobile App (React Native version)**.  
🔹 **AI-based Task Recommendations**.  
🔹 **Integration with Slack / Email Notifications**.

---

## 👥 **Contributing**

1. **Fork** the repository.
2. Create a **new branch** (`feature/new-feature`).
3. **Commit** your changes (`fix: improved task filters`).
4. **Push** and open a **pull request**!

🚀 **We welcome contributions from everyone!**

---

```
TaskFlow
├─ .git
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ dark-task-flow-screenshot.png
│  ├─ iconTaskFlow.svg
│  └─ light-task-flow-screenshot.png
├─ README.md
├─ server
│  ├─ db.json
│  └─ routes.json
├─ src
│  ├─ api
│  │  ├─ authService.ts
│  │  ├─ axiosInstance.ts
│  │  ├─ projectAccessService.ts
│  │  ├─ projectColumnsService.ts
│  │  ├─ projectService.ts
│  │  ├─ taskService.ts
│  │  └─ userService.ts
│  ├─ assets
│  │  ├─ avatar
│  │  │  ├─ avatar-desktop.png
│  │  │  └─ avatar-mobile.png
│  │  └─ icons
│  │     ├─ iconTaskFlow.svg
│  │     └─ sprite.svg
│  ├─ components
│  │  ├─ ActionButtons.tsx
│  │  ├─ App.tsx
│  │  ├─ CustomDatePicker.scss
│  │  ├─ CustomDatePicker.tsx
│  │  ├─ Dashboard
│  │  │  ├─ components
│  │  │  │  ├─ GeneralStats.tsx
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ ProjectList.tsx
│  │  │  │  └─ TaskStatistics.tsx
│  │  │  └─ DashboardLayout.tsx
│  │  ├─ FilterManager
│  │  │  ├─ components
│  │  │  │  ├─ PriorityFilter.tsx
│  │  │  │  ├─ StatusFilter.tsx
│  │  │  │  └─ TeamMemberFilter.tsx
│  │  │  ├─ FilterManager.tsx
│  │  │  ├─ FilterPopup.tsx
│  │  │  └─ ProjectFilterManager.tsx
│  │  ├─ Forms
│  │  │  ├─ AuthForm
│  │  │  │  ├─ AuthForm.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ components
│  │  │  │  ├─ AuthSwitch.tsx
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ InputField.tsx
│  │  │  │  ├─ RoleSelectField.tsx
│  │  │  │  ├─ SubmitAuthButton.tsx
│  │  │  │  └─ SubmitFormButton.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ ProjectManagementForms
│  │  │  │  ├─ ColumnForm.tsx
│  │  │  │  ├─ components
│  │  │  │  │  ├─ DatePickerFields.tsx
│  │  │  │  │  ├─ DescriptionField.tsx
│  │  │  │  │  ├─ IconPicker.tsx
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ PriorityPicker.tsx
│  │  │  │  │  ├─ StatusPicker.tsx
│  │  │  │  │  ├─ TeamMemberPicker
│  │  │  │  │  │  ├─ customSelectStyles.ts
│  │  │  │  │  │  └─ TeamMemberPicker.tsx
│  │  │  │  │  └─ TitleField.tsx
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ ProjectForm.tsx
│  │  │  │  └─ TaskForm.tsx
│  │  │  └─ UserForms
│  │  │     ├─ CreateUserForm.tsx
│  │  │     ├─ EditUserForm.tsx
│  │  │     └─ index.ts
│  │  ├─ GanttChart.tsx
│  │  ├─ KanbanBoard
│  │  │  ├─ components
│  │  │  │  ├─ Buttons
│  │  │  │  │  ├─ AddColumnButton.tsx
│  │  │  │  │  └─ AddTaskButton.tsx
│  │  │  │  ├─ Card
│  │  │  │  │  ├─ Card.tsx
│  │  │  │  │  └─ components
│  │  │  │  │     ├─ CardActions.tsx
│  │  │  │  │     ├─ CardDescription.tsx
│  │  │  │  │     ├─ CardFooter.tsx
│  │  │  │  │     ├─ DeadlineIndicator.tsx
│  │  │  │  │     └─ PriorityIndicator.tsx
│  │  │  │  └─ Column
│  │  │  │     ├─ Column.tsx
│  │  │  │     └─ components
│  │  │  │        └─ ColumnActions.tsx
│  │  │  └─ KanbanBoard.tsx
│  │  ├─ Layout
│  │  │  ├─ Header
│  │  │  │  └─ Header.tsx
│  │  │  ├─ Layout.tsx
│  │  │  └─ Sidebar
│  │  │     ├─ components
│  │  │     │  ├─ index.ts
│  │  │     │  ├─ SidebarBoards.tsx
│  │  │     │  ├─ SidebarFooter.tsx
│  │  │     │  ├─ SidebarHeader.tsx
│  │  │     │  ├─ SidebarNavigation.tsx
│  │  │     │  └─ SidebarOverlay.tsx
│  │  │     └─ Sidebar.tsx
│  │  ├─ Loaders
│  │  │  ├─ DashboardSkeleton.tsx
│  │  │  ├─ InlineLoader.tsx
│  │  │  ├─ MainLoader.tsx
│  │  │  └─ TaskSkeleton.tsx
│  │  ├─ LogoWithTitle.tsx
│  │  ├─ Modals
│  │  │  ├─ CustomModal.tsx
│  │  │  └─ DeleteModal.tsx
│  │  ├─ SwitchToggle
│  │  │  ├─ SwitchToggle.module.scss
│  │  │  └─ SwitchToggle.tsx
│  │  ├─ TimeProgressBar.tsx
│  │  ├─ UI
│  │  │  ├─ BurgerButton.tsx
│  │  │  ├─ CreateBoard.tsx
│  │  │  ├─ CustomIcon.tsx
│  │  │  ├─ LogOut.tsx
│  │  │  ├─ ProjectNavigationItem.tsx
│  │  │  ├─ ProjectNavigationList.tsx
│  │  │  ├─ ThemeSwitcher.tsx
│  │  │  └─ UserIcon.tsx
│  │  ├─ UserManagement
│  │  │  ├─ CreateUserButton.tsx
│  │  │  ├─ FilterSwitcher.tsx
│  │  │  ├─ Table
│  │  │  │  ├─ Table.tsx
│  │  │  │  ├─ TableFilters.tsx
│  │  │  │  └─ TablePagination.tsx
│  │  │  ├─ UserActions.tsx
│  │  │  ├─ UserModals.tsx
│  │  │  └─ UsersTable.tsx
│  │  └─ Welcome
│  │     ├─ WelcomeAvatar.tsx
│  │     ├─ WelcomeButtons.tsx
│  │     └─ WelcomeHeader.tsx
│  ├─ constants
│  │  └─ api.ts
│  ├─ hooks
│  │  ├─ auth
│  │  │  ├─ useAuth.ts
│  │  │  └─ useAuthMutation.ts
│  │  ├─ columns
│  │  │  └─ useColumns.ts
│  │  ├─ kanban
│  │  │  └─ useKanbanDragAndDrop.ts
│  │  ├─ projects
│  │  │  ├─ useProjectDataBySlug.ts
│  │  │  └─ useProjects.ts
│  │  ├─ tasks
│  │  │  ├─ useFilteredTasks.ts
│  │  │  ├─ useTasks.ts
│  │  │  └─ useTaskStatistics.ts
│  │  └─ users
│  │     ├─ useTeamMembers.ts
│  │     └─ useUsers.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AuthPage.tsx
│  │  ├─ MainDashboardPage.tsx
│  │  ├─ ProjectPage.tsx
│  │  ├─ UserManagementPage.tsx
│  │  └─ WelcomePage.tsx
│  ├─ routes
│  │  ├─ PrivateRoute.tsx
│  │  └─ RestrictedRoute.tsx
│  ├─ stores
│  │  ├─ auth
│  │  │  └─ userStore.ts
│  │  └─ filters
│  │     ├─ ProjectsFilterStore.ts
│  │     ├─ TasksFilterStore.ts
│  │     └─ UsersFilterStore.ts
│  ├─ styles
│  │  ├─ animations.css
│  │  ├─ drag-and-drop.css
│  │  ├─ gantt.css
│  │  ├─ scrollbars.css
│  │  ├─ table.css
│  │  └─ themes.css
│  ├─ types
│  │  ├─ auth.d.ts
│  │  ├─ charts.d.ts
│  │  ├─ common.d.ts
│  │  ├─ filters.d.ts
│  │  ├─ project.d.ts
│  │  ├─ react-ellipsis-text.d.ts
│  │  ├─ task.d.ts
│  │  └─ user.d.ts
│  ├─ utils
│  │  └─ generateColors.ts
│  ├─ validation
│  │  ├─ authValidation.ts
│  │  ├─ columnValidation.ts
│  │  ├─ projectValidation.ts
│  │  └─ taskValidation.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts
```
