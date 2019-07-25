export interface Course {
    id: number;
    description: string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category: 'BEGINNER' | 'ADVANCED';
    lessonsCount: number;
}

export type Courses = Course[];

export interface CoursesResponse {
  payload: Courses;
}
