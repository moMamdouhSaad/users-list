export interface SingleUserApiResponse {
    data: {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    }
}

export interface UsersListApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  }

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }

  
export interface UpdatedUserApiResponse {
    updatedUser:{

    name: string,
    job: string
}

}

export interface UpdatedUserApiRequest {
        name: string,
        job: string
}

export interface UpdatedUserModel {
  name: string,
  job: string
}
  
