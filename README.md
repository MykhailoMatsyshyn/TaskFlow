# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

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
│  └─ iconTaskFlow.svg
├─ README.md
├─ server
│  ├─ db.json
│  ├─ routes.json
│  └─ server.js
├─ src
│  ├─ api
│  │  ├─ authService.ts
│  │  ├─ axiosInstance.ts
│  │  ├─ handleRequest.ts
│  │  ├─ projectService.ts
│  │  └─ taskService.ts
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
│  │  ├─ CustomIcon
│  │  │  └─ CustomIcon.tsx
│  │  ├─ CustomModal
│  │  │  ├─ CustomModal.scss
│  │  │  └─ CustomModal.tsx
│  │  ├─ Dashboard
│  │  │  ├─ GeneralStats.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ ProjectList.tsx
│  │  │  └─ TaskStatistics.tsx
│  │  ├─ Filter
│  │  │  └─ Filter.tsx
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
│  │  │  ├─ BurgerButton.tsx
│  │  │  ├─ components
│  │  │  │  └─ LogOut
│  │  │  │     └─ LogOut.tsx
│  │  │  ├─ CreateBoard.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Layout.tsx
│  │  │  ├─ ProjectNavigationItem.tsx
│  │  │  ├─ ProjectNavigationList.tsx
│  │  │  └─ Sidebar.tsx
│  │  ├─ Loaders
│  │  │  ├─ InlineLoader.tsx
│  │  │  ├─ MainLoader.tsx
│  │  │  └─ TaskSkeleton.tsx
│  │  ├─ LogoWithTitle
│  │  │  └─ LogoWithTitle.tsx
│  │  ├─ Modals
│  │  │  └─ DeleteModal.tsx
│  │  ├─ PrivateRoute.tsx
│  │  ├─ RestrictedRoute.tsx
│  │  ├─ SwitchToggle
│  │  │  ├─ SwitchToggle.module.scss
│  │  │  └─ SwitchToggle.tsx
│  │  ├─ Table
│  │  │  ├─ FilterIcon.tsx
│  │  │  ├─ Table.tsx
│  │  │  └─ TableStyles.css
│  │  ├─ ThemeSwitcher
│  │  │  └─ ThemeSwitcher.tsx
│  │  ├─ TimeProgressBar.tsx
│  │  └─ UserIcon
│  │     └─ UserIcon.tsx
│  ├─ config
│  │  └─ columns.ts
│  ├─ hooks
│  │  ├─ useAuth.ts
│  │  ├─ useAuthMutation.ts
│  │  ├─ useCreateColumn.ts
│  │  ├─ useCreateProject.ts
│  │  ├─ useCreateTask.ts
│  │  ├─ useDeleteColumn.ts
│  │  ├─ useDeleteProject.ts
│  │  ├─ useDeleteTask.ts
│  │  ├─ useFetchAllProjects.ts
│  │  ├─ useFetchAllTasks.ts
│  │  ├─ useFetchUser.ts
│  │  ├─ useFetchUserProjects.ts
│  │  ├─ useFetchUsers.ts
│  │  ├─ useKanbanDragAndDrop.ts
│  │  ├─ useProjectDataBySlug.ts
│  │  ├─ useProjectId.ts
│  │  ├─ useTasksByProject.ts
│  │  ├─ useTeamMembersByIds.ts
│  │  ├─ useTeamMembersQuery.ts
│  │  ├─ useUpdateColumn.ts
│  │  ├─ useUpdateColumns.ts
│  │  ├─ useUpdateColumnTasks.ts
│  │  ├─ useUpdateProject.ts
│  │  ├─ useUpdateTask.ts
│  │  └─ useUpdateUser.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AuthPage
│  │  │  └─ AuthPage.tsx
│  │  ├─ MainDashboardPage
│  │  │  └─ MainDashboardPage.tsx
│  │  ├─ ProjectPage
│  │  │  └─ ProjectPage.tsx
│  │  ├─ UserManagementPage
│  │  │  └─ UserManagementPage.tsx
│  │  └─ WelcomePage
│  │     └─ WelcomePage.tsx
│  ├─ stores
│  │  ├─ filterStore.ts
│  │  ├─ ProjectFilterStore.ts
│  │  ├─ TaskFilterStore.ts
│  │  └─ userStore.ts
│  ├─ types
│  │  ├─ auth.d.ts
│  │  ├─ filters.d.ts
│  │  ├─ project.d.ts
│  │  ├─ react-ellipsis-text.d.ts
│  │  ├─ task.d.ts
│  │  └─ user.d.ts
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
