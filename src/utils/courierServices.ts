
export interface CourierService {
  id: string;
  name: string;
  nameBn: string;
  cost: number;
  description?: string;
}

export const courierServices: CourierService[] = [
  {
    id: 'steadfast',
    name: 'Steadfast Courier',
    nameBn: 'স্টেডফাস্ট কুরিয়ার',
    cost: 60,
    description: 'Fast delivery within Dhaka'
  },
  {
    id: 'pathao',
    name: 'Pathao Courier',
    nameBn: 'পাঠাও কুরিয়ার',
    cost: 70,
    description: 'Reliable nationwide delivery'
  },
  {
    id: 'redx',
    name: 'RedX Courier',
    nameBn: 'রেডএক্স কুরিয়ার',
    cost: 65,
    description: 'Express delivery service'
  },
  {
    id: 'paperfly',
    name: 'Paperfly',
    nameBn: 'পেপারফ্লাই',
    cost: 55,
    description: 'Economy delivery option'
  }
];
