import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

export default function App() {
  return (
    <div className="bg-background">
      <ThemeSwitcher />
      <h1 className=" text-3xl font-bold">Hello world!</h1>
    </div>
  );
}
