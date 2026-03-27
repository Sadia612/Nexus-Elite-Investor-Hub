import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageCircle, Video } from 'lucide-react';
import { CollaborationRequest } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { findUserById } from '../../data/users';
import { updateRequestStatus } from '../../data/collaborationRequests';
import { formatDistanceToNow } from 'date-fns';

interface CollaborationRequestCardProps {
  request: CollaborationRequest;
  onStatusUpdate?: (requestId: string, status: 'accepted' | 'rejected') => void;
}

export const CollaborationRequestCard: React.FC<CollaborationRequestCardProps> = ({
  request,
  onStatusUpdate
}) => {
  const navigate = useNavigate();
  const investor = findUserById(request.investorId);

  if (!investor) return null;

  // Fix for Avatar Source Type Error
  const avatarSrc = investor.avatarUrl || '';

  const handleAccept = () => {
    updateRequestStatus(request.id, 'accepted');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'accepted');
    }
  };

  const handleReject = () => {
    updateRequestStatus(request.id, 'rejected');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'rejected');
    }
  };

  const handleMessage = () => {
    navigate(`/chat/${investor.id}`);
  };

  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };

  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="error">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all duration-300 mb-4">
      <CardBody className="flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <Avatar
              src={avatarSrc}
              alt={investor.name}
              size="md"
              status={investor.isOnline ? 'online' : 'offline'}
              className="mr-3"
            />
            <div>
              <h3 className="text-md font-semibold text-gray-900">{investor.name}</h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">{request.message}</p>
        </div>
      </CardBody>

      <CardFooter className="border-t border-gray-100 bg-gray-50 flex flex-wrap gap-2 justify-between items-center">
        {request.status === 'pending' ? (
          <div className="flex justify-between w-full">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" leftIcon={<X size={16} />} onClick={handleReject}>
                Decline
              </Button>
              <Button variant="success" size="sm" leftIcon={<Check size={16} />} onClick={handleAccept}>
                Accept
              </Button>
              <Button variant="outline" size="sm" leftIcon={<MessageCircle size={16} />} onClick={handleMessage}>
                Message
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/video-call')} className="px-2">
                <Video size={18} className="text-blue-600" />
              </Button>
            </div>
            <Button variant="primary" size="sm" onClick={handleViewProfile}>
              View Profile
            </Button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<MessageCircle size={16} className="text-blue-600" />} 
                onClick={handleMessage}
                className="border-blue-100 bg-blue-50 text-blue-700"
              >
                Message
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/video-call')} 
                className="px-2 border-blue-100 bg-blue-50"
              >
                <Video size={18} className="text-blue-600" />
              </Button>
            </div>
            <Button variant="primary" size="sm" onClick={handleViewProfile}>
              View Profile
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};