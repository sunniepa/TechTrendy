import { useEffect, useState } from 'react'
import provinceData from '../../address/province.json'
import districtData from '../../address/district.json'
import wardData from '../../address/wards.json'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const UserAddress = ({ setIsOpen, address, onAddressUpdate }) => {
  const [selectedProvince, setSelectedProvince] = useState(
    address ? provinceData.find((p) => p.Tên === address.province).Mã : ''
  )
  const [selectedDistrict, setSelectedDistrict] = useState(
    address ? districtData.find((d) => d.Tên === address.district).Mã : ''
  )
  const [selectedWards, setSelectedWards] = useState(
    address ? wardData.find((w) => w.Tên === address.ward).Mã : ''
  )
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardsOptions] = useState([])

  const [name, setName] = useState(address ? address.name : '')
  const [contact, setContact] = useState(address ? address.contact : '')
  const [street, setStreet] = useState(address ? address.street : '')

  console.log(selectedProvince)
  useEffect(() => {
    if (selectedProvince) {
      const filteredDistrict = districtData.filter(
        (dt) => dt['Mã TP'] === selectedProvince
      )
      setDistrictOptions(filteredDistrict)
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      const filteredWard = wardData.filter(
        (w) => w['Mã QH'] === selectedDistrict
      )
      setWardsOptions(filteredWard)
    }
  }, [selectedDistrict])

  const userAddress = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const decodedToken = jwtDecode(accessToken)
      const userId = decodedToken.nameid

      const provinceName = provinceData.find(
        (province) => province.Mã === selectedProvince
      ).Tên

      const districtName = districtData.find(
        (district) => district.Mã === selectedDistrict
      ).Tên

      const wardName = wardData.find((ward) => ward.Mã === selectedWards).Tên

      const addressData = {
        Name: name,
        Contact: contact,
        Street: street,
        Ward: wardName,
        District: districtName,
        Province: provinceName,
      }

      let response
      if (address) {
        response = await axios.put(
          `https://localhost:5000/api/UserAddress/${userId}?addressId=${address.id}`,
          addressData
        )
      } else {
        response = await axios.post(
          `https://localhost:5000/api/UserAddress?userId=${userId}`,
          addressData
        )
      }
      console.log(response.data.data)
      console.log(provinceName)
      console.log(districtName)
      console.log(wardName)
      setIsOpen(false)
      onAddressUpdate()
    } catch (error) {
      if (error.response) {
        console.log('Lỗi từ server:', error.response.data)
      } else if (error.request) {
        console.log('Không nhận được phản hồi từ server:', error.request)
      } else {
        console.log('Lỗi khi thiết lập yêu cầu:', error.message)
      }
    }
  }

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value)
    setSelectedDistrict('')
    setSelectedWards('')
    console.log(selectedProvince)
  }

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value)
    console.log(selectedDistrict)
  }

  const handleWardChange = (event) => {
    setSelectedWards(event.target.value)
    console.log(selectedWards)
  }

  const handleContactChange = (event) => {
    const value = event.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setContact(value)
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/2 p-8 bg-white">
          <form>
            <p className="flex justify-center mb-5 text-xl">
              Địa chỉ nhận hàng
            </p>
            <div className="">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="">
                  <input
                    className="w-full py-2 pl-3 border border-gray-200"
                    placeholder="Tên người nhận"
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="">
                  <input
                    className="w-full py-2 pl-3 border border-gray-200"
                    type="tel"
                    placeholder="Số điện thoại"
                    maxLength="10"
                    value={contact}
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="py-2 pl-3 border border-gray-200"
                >
                  {!selectedProvince && (
                    <option value="">Chọn tỉnh thành</option>
                  )}
                  {provinceData.map((tt) => (
                    <option key={tt.Mã} value={tt.Mã}>
                      {tt.Tên}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="py-2 pl-3 border border-gray-200"
                >
                  {!selectedDistrict && (
                    <option value="">Chọn quận huyện</option>
                  )}
                  {districtOptions.map((qh) => (
                    <option key={qh.Mã} value={qh.Mã}>
                      {qh.Tên}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedWards}
                  onChange={handleWardChange}
                  className="py-2 pl-3 border border-gray-200"
                >
                  {!selectedWards && <option value="">Chọn Phường, Xã</option>}
                  {wardOptions.map((px) => (
                    <option key={px.Mã} value={px.Mã}>
                      {px.Tên}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="w-full py-2 pl-3 border border-gray-200"
                  placeholder="Số nhà, tên đường"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="w-[140px] h-10 border-cancel mr-2 hover:bg-[#f8f8f8]"
                  onClick={() => setIsOpen(false)}
                >
                  Đóng
                </button>
                <button
                  className="w-[140px] h-10 bg-[#ee4d2d] text-white outline-none hover:bg-[#f05d40]"
                  type="button"
                  onClick={userAddress}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserAddress
