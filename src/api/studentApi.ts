import axios from 'axios';

const studentApi = axios.create({
  baseURL: 'http://localhost:4000/student/'  
});

export type Student = {
  code: number;
  last_name: string;
  first_name: string;
  age: number;
  weight: number;
  height: number;
  color: string;
  province: string;
  career_code: string;
  entry_date: string;
}

export type StudentCount = {
  career: string;
  student_count: number;
}

export const getCountByCareer = (): Promise<{data:StudentCount[]}> => {
  return studentApi.get('/count-by-career');
};

export const getMainQuery = (careerCode: number): Promise<{data:Student[] }> => {
  return studentApi.get('/main-query?careerCode=' + careerCode);
};
