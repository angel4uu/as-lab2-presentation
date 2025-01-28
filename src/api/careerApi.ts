import axios from 'axios';

const careerApi = axios.create({
  baseURL: 'http://localhost:4000/career/'  
});

export type ProfessionalCareer ={
  code: number;
  name: string;
  creation_date: string;
}

export const getAllCareers= (): Promise<{data:ProfessionalCareer[] }>  => {
  return careerApi.get('/');
};
