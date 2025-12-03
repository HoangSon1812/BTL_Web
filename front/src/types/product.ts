export type Category = 'dogiadung' | 'dientu' | 'thucpham' | 'douong'

export interface Product {
  id: number
  maMatHang?: string | null
  tenMatHang?: string | null
  moTa?: string | null
  donViTinh?: string | null
  donGia?: number | null
  soLuongTon?: number | null
  image_url?: string | null
  category?: Category | null
  don_gia?: number | null
  don_vi_tinh?: string | null
  ma_mat_hang?: string | null
  mo_ta?: string | null
  so_luong_ton?: number | null
  ten_mat_hang?: string | null
}
