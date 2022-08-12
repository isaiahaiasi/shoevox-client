import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  BrowserRouter,
} from 'react-router-dom';
import AuthProvider from './AuthProvider';
import RouteSwitch from './RouteSwitch';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-black text-white h-full overflow-auto flex flex-col">
          <AuthProvider>
            <RouteSwitch />
          </AuthProvider>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
