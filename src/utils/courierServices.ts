
export const courierServices = [
  { id: 'pathao', name: 'Pathao Courier', nameBn: 'পাঠাও কুরিয়ার', cost: 60 },
  { id: 'sundarban', name: 'Sundarban Courier', nameBn: 'সুন্দরবন কুরিয়ার', cost: 80 },
  { id: 'sa-paribahan', name: 'SA Paribahan', nameBn: 'এসএ পরিবহন', cost: 100 },
  { id: 'redx', name: 'RedX Courier', nameBn: 'রেডএক্স কুরিয়ার', cost: 70 },
  { id: 'steadfast', name: 'Steadfast Courier', nameBn: 'স্টেডফাস্ট কুরিয়ার', cost: 65 },
  { id: 'other', name: 'Other', nameBn: 'অন্যান্য', cost: 50 }
];

export const getCourierService = (id: string) => {
  return courierServices.find(service => service.id === id);
};
