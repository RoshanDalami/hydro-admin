import React from 'react'
import PageHeader from '@/components/reusable/PageHeader';
import GalleryView from './components/GalleryView';
function GalleryIndex() {
  return (
    <div>
      <PageHeader title='Gallery Images' description="Welcome back! Here's an gallery images view of your platform" />
      <GalleryView />
    </div>
  )
}

export default GalleryIndex;