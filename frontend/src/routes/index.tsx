import { createFileRoute, redirect } from '@tanstack/react-router';
import logo from '../logo.svg';
import '../App.css';
import ApiAuth from '@/lib/api';

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: async () => {
    const user = await ApiAuth.get('/user');
    console.log(user);
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <a className="App-link" href="https://tanstack.com" target="_blank" rel="noopener noreferrer">
          Learn TanStack
        </a>
      </header>
    </div>
  );
}
