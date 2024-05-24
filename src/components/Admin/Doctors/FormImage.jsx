import ImageUpload from '@/components/UI/form/ImageUpload';
import dImage from '@/images/avatar.jpg';

const FormImage = ({
  selectedImage,
  setSelectedImage,
  file,
  setFile,
}) => {
  return (
    <>
      <form>
        <div className="col-md-12 mb-5">
          <div className="form-group">
            <div className="change-avatar d-flex gap-2 align-items-center">
              <div className="my-3 patient-img">
                <img src={selectedImage ? selectedImage : selectedImage || dImage} alt="" />
              </div>
              <div className='mt-3'>
                <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormImage;