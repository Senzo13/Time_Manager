import { StateProvider } from "./src/context/state.context";
import { StackNavigation } from "./src/components/stack.navigation/tab.bar";
export default function App() {
  return (
    <StateProvider>
      <StackNavigation />
    </StateProvider>
  );
}
