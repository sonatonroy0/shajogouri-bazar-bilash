import React from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  Image, FileText, BarChart3, Home, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: 'en' | 'bn';
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange, language }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const content = {
    en: {
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      banners: 'Banners',
      settings: 'Settings',
      reports: 'Reports',
      goToSite: 'Go to Site',
      logout: 'Logout'
    },
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      products: 'পণ্যসমূহ',
      orders: 'অর্ডারসমূহ',
      users: 'ব্যবহারকারীগণ',
      banners: 'ব্যানার',
      settings: 'সেটিংস',
      reports: 'রিপোর্ট',
      goToSite: 'সাইট দেখুন',
      logout: 'লগআউট'
    }
  };

  const menuItems = [
    { id: 'overview', label: content[language].dashboard, icon: LayoutDashboard },
    { id: 'products', label: content[language].products, icon: Package },
    { id: 'orders', label: content[language].orders, icon: ShoppingCart },
    { id: 'users', label: content[language].users, icon: Users },
    { id: 'banners', label: content[language].banners, icon: Image },
    { id: 'reports', label: content[language].reports, icon: BarChart3 },
    { id: 'settings', label: content[language].settings, icon: Settings },
  ];

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-serif font-bold text-gray-900">
          {language === 'en' ? 'Shajogouri Admin' : 'সাজগৌরী অ্যাডমিন'}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/')}
        >
          <Home className="h-5 w-5 mr-3" />
          {content[language].goToSite}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {content[language].logout}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
