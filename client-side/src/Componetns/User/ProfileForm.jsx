import React, { useEffect } from "react";
import userStore from "../../Store/UserStore";
import { toast } from "react-toastify";
import ProfileSkeleton from "../../LoadingSkeleton/ProfileSkeleton";

const ProfileForm = () => {
  const {
    profileForm,
    profileFormChange,
    profileDetails,
    profileDetailsRequest,
    profileSaveRequest,
  } = userStore();
  useEffect(() => {
    (async () => {
      await profileDetailsRequest();
    })();
  }, []);

  const save = async () => {
    let res = await profileSaveRequest(profileForm);
    if (res) {
      toast.success("Profile Updated");
      await profileDetailsRequest();
    }
  };

  if (profileDetails === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div>
        <div className='container mt-5'>
          <div className='card p-5 rounded-3'>
            <h6>Customer Details</h6>
            <hr />
            <div className='row mb-4'>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Name </label>
                <input
                  value={profileForm.cus_name}
                  onChange={(e) => {
                    profileFormChange("cus_name", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Phone </label>
                <input
                  value={profileForm.cus_phone}
                  onChange={(e) => {
                    profileFormChange("cus_phone", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Fax </label>
                <input
                  value={profileForm.cus_fax}
                  onChange={(e) => {
                    profileFormChange("cus_fax", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Country </label>
                <input
                  value={profileForm.cus_country}
                  onChange={(e) => {
                    profileFormChange("cus_country", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer City </label>
                <input
                  value={profileForm.cus_city}
                  onChange={(e) => {
                    profileFormChange("cus_city", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer State </label>
                <input
                  value={profileForm.cus_state}
                  onChange={(e) => {
                    profileFormChange("cus_state", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Post Code </label>
                <input
                  value={profileForm.cus_postcode}
                  onChange={(e) => {
                    profileFormChange("cus_postcode", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Customer Address</label>
                <input
                  value={profileForm.cus_add}
                  onChange={(e) => {
                    profileFormChange("cus_add", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
            </div>
            <h6>Shipping Details</h6>
            <hr />
            <div className='row'>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping Name </label>
                <input
                  value={profileForm.ship_name}
                  onChange={(e) => {
                    profileFormChange("ship_name", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping Phone </label>
                <input
                  value={profileForm.ship_phone}
                  onChange={(e) => {
                    profileFormChange("ship_phone", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping Country </label>
                <input
                  value={profileForm.ship_country}
                  onChange={(e) => {
                    profileFormChange("ship_country", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping City </label>
                <input
                  value={profileForm.ship_city}
                  onChange={(e) => {
                    profileFormChange("ship_city", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping State </label>
                <input
                  value={profileForm.ship_state}
                  onChange={(e) => {
                    profileFormChange("ship_state", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping Post Code </label>
                <input
                  value={profileForm.ship_postcode}
                  onChange={(e) => {
                    profileFormChange("ship_postcode", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
              <div className='col-md-3 p-2'>
                <label className='form-label'>Shipping Address</label>
                <input
                  value={profileForm.ship_add}
                  onChange={(e) => {
                    profileFormChange("ship_add", e.target.value);
                  }}
                  type='text'
                  className='form-control '
                />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-3 p-2'>
                <button className='btn btn-success' onClick={save}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
