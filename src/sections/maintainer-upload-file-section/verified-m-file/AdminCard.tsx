import React from 'react';
import { CardStyled } from '../../../styles/card/CardStyled';
import { UserModel } from '../../../types/models/user-model';
import TextWithIcon from '../../../components/text/TextWithIcon';
import { Avatar, Sx, Title } from '@mantine/core';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';

type Props = {
  admins: string[] | UserModel[];
  sx?: Sx;
};

export const AdminCard = (props: Props) => {
  const { admins, sx } = props;
  console.log('admins', admins);
  return (
    <CardWithTitle title={'Contacts'} sx={{ background: 'transparent' }}>
      {admins.map((admin, index) => {
        if (typeof admin === 'string') {
          throw new Error('not populated');
        }
        return (
          <TextWithIcon
            key={admin._id}
            icon={<Avatar src={admin.avatar?.url} size={24} radius="xl" />}
            text={`${admin.name} ${admin.surname} - ${admin.email}`}
          />
        );
      })}
    </CardWithTitle>
  );
};
