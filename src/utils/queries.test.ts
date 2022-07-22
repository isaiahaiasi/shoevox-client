import { describe, expect, test } from 'vitest';
import { getUrl } from './queries';

const urlBase = import.meta.env.VITE_API_URL;

describe('getUrl', () => {
  // Todo: mock my lib
  test('should append query params', () => {
    const operation = 'getRooms';
    const expected = `${urlBase}/rooms?limit=5&cursor=randomcursor`;
    const reqData = { query: { limit: '5', cursor: 'randomcursor' } };

    expect(getUrl(operation, reqData)).toBe(expected);
  });

  test('should interpolate path params', () => {
    const operation = 'getCommentsByRoomId';
    const reqData = { params: { roomid: '12345' }, query: {} };
    const expected = `${urlBase}/rooms/12345/comments`;

    expect(getUrl(operation, reqData)).toBe(expected);
  });
});
