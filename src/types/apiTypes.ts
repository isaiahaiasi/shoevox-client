// TODO: These are TEMPORARY. I need to either derive from--or extract *to*--Spec lib.

export interface RootApiObject {
  id: string;
  createdAt: string;
}

export interface ApiPageData<T extends RootApiObject> {
  data: T[],
  links: {
    next?: {
      href: string;
      cursor: string | string[];
    };
  }
}

export interface UserDto extends RootApiObject {
  username: string;
}

export interface RoomDto extends RootApiObject {
  creator: UserDto,
  title: string;
  url: string;
}
