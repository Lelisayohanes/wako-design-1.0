import { FooterComponent } from '@/components/components-footer'
import { HeaderComponent } from '@/components/components-header'
import { TShirtDetailPageComponent } from '@/components/t-shirt-detail-page'
import React from 'react'

function ProductDetail() {
  return (
    <div>
      <HeaderComponent/>
      <TShirtDetailPageComponent/>
      <FooterComponent/>
    </div>
  )
}

export default ProductDetail
