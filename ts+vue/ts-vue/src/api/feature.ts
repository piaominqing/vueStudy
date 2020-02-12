import axios from 'axios'; 
import {Feature} from '@/types/index';

export function getFeatures() {    
  // 通过泛型约束返回值类型，这里是Promise<AxiosResponse<Feature[]>>    
  return axios.get<Feature[]>('/api/list') 
}

