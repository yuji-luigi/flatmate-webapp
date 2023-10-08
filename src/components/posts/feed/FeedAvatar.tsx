import { Avatar } from '@mantine/core';
import React from 'react';
import { UserModel } from '../../../types/models/user-model';
type FeedAvatarProps {
  createdBy?: UserModel
}
export const FeedAvatar = (props: FeedAvatarProps) => {
  const {createdBy} = props
  
  return     <Avatar
  src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
  radius={90}
  size={40}
/>
};
