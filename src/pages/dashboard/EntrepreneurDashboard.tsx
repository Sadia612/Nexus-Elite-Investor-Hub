import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { investors } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  // Hardcoded data for Vercel taake empty screen na aaye
  const [requests] = useState([
    {
      id: 'req-1',
      investorId: 'investor-1',
      entrepreneurId: 'user-1',
      message: "I'd like to explore potential investment in TechWave AI. Your AI-driven financial analytics platform aligns well with my investment thesis.",
      status: 'pending',
      createdAt: new Date().toISOString(),
      investor: investors[0]
    }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Sarah Johnson</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>
        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border border-blue-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4"><Bell size={20} className="text-blue-700" /></div>
            <div><p className="text-sm font-medium text-blue-700">Pending Requests</p><h3 className="text-xl font-semibold text-blue-900">1</h3></div>
          </CardBody>
        </Card>
        <Card className="bg-purple-50 border border-purple-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4"><Users size={20} className="text-purple-700" /></div>
            <div><p className="text-sm font-medium text-purple-700">Total Connections</p><h3 className="text-xl font-semibold text-purple-900">1</h3></div>
          </CardBody>
        </Card>
        <Card className="bg-orange-50 border border-orange-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full mr-4"><Calendar size={20} className="text-orange-700" /></div>
            <div><p className="text-sm font-medium text-orange-700">Upcoming Meetings</p><h3 className="text-xl font-semibold text-orange-900">1</h3></div>
          </CardBody>
        </Card>
        <Card className="bg-green-50 border border-green-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4"><TrendingUp size={20} className="text-green-700" /></div>
            <div><p className="text-sm font-medium text-green-700">Profile Views</p><h3 className="text-xl font-semibold text-green-900">24</h3></div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">1 pending</Badge>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* Mandatory render taake Vercel miss na kare */}
              <CollaborationRequestCard
                request={requests[0] as any}
                onStatusUpdate={() => {}}
              />
            </CardBody>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600">View all</Link>
            </CardHeader>
            <CardBody className="space-y-4">
              <InvestorCard investor={investors[0]} showActions={false} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};