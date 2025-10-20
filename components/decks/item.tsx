import React from 'react';
import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IProps {
  title: string;
  description: string | null;
}

const DeckItem = ({ title, description }: IProps) => {
  return (
    <Link href='#'>
      <Card className='transition-all hover:shadow-lg'>
        <CardHeader>
          <CardTitle className='text-balance'>{title}</CardTitle>
          <CardDescription className='line-clamp-2'>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default DeckItem;
