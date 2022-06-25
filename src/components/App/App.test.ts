import { describe, it } from 'vitest';

describe('App', () => {
  it.todo('Renders Welcome if not logged in and path="/"');
  it.todo('Redirects to Dashboard if logged in and path="/"');
  it.todo('Renders Dashboard if logged in and path="/dashboard"');
  it.todo('Redirects to Welcome if not logged and path="/dashboard"');
  it.todo('Redirects to NotFound if page could not be found.');
});
