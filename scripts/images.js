const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Выберите файл...";
pictureImage.innerHTML = pictureImageTxt;
var loadedImage = 0;
var imagePaths = {}

inputFile.addEventListener("change", function (e) {
  detectUpload(e);
});

async function detectUpload(e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {

    const validation = await validateFile(file);

    if (validation) {
      document.querySelector('.custom_skin-submit').disabled = undefined;
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        loadedImage = readerTarget.result;
        

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      document.querySelector('.custom_skin-submit').disabled = true;
    }
  } else {
    document.querySelector('custom_skin-submit').disabled = true;
    pictureImage.innerHTML = pictureImageTxt;
  }
}

async function uploadImage() {

  try {

    const response = await fetch('php/upload_image.php', {
      method: 'POST',
      body: JSON.stringify({
        image: loadedImage.split(',')[1]
      })
    })
    const result = await response.json();
    // console.log(result);

    if (result.success) {
    } else if (result.error) {
      console.log(result.error);
    }
  } catch (error) {
    console.error('Error: ', error)
  }
}

function getImageMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          format: file.type.split('/')[1] // Например, "png"
        })
      }
      img.onerror = reject
      img.src = event.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function countNonTransparentPixels(ctx, startX, startY, width, height) {
  const imageData = ctx.getImageData(startX, startY, width, height)
  let nonTransparentPixelCount = 0

  for (let i = 0; i < imageData.data.length; i += 4) {
    const alpha = imageData.data[i + 3]
    if (alpha > 0) {
      nonTransparentPixelCount++
    }
  }

  return nonTransparentPixelCount
}
function detectSkinFormat(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Проверяем ширину задней части левой руки
        const classicWidthPixels = countNonTransparentPixels(ctx, 44, 52, 4, 12)
        const slimWidthPixels = countNonTransparentPixels(ctx, 44, 52, 3, 12)

        if (classicWidthPixels > slimWidthPixels) {
          resolve('Classic (Steve)')
        } else {
          resolve('Slim (Alex)')
        }
      }

      img.onerror = reject
      img.src = event.target.result
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}



async function validateFile(file) {
  if (!file) {
    showPopup('Загрузите файл.', 'warn');
    return false;
  }

  const allowedExtensions = ['png'];
  const maxFileSize = 10 * 1024; // 10 КБ

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    showPopup('Изображение должно иметь расширение .PNG: убедитесь, что вы загружаете правильный файл.', 'error');
    return false;
  }

  if (file.size > maxFileSize) {
    showPopup('Изображение слишком тяжёлое: убедитесь, что вы загружаете правильный файл.', 'error');
    return false;
  }

  const metadata = await getImageMetadata(file);
  const { width, height, format } = metadata;

  const validSizes = [
    { width: 64, height: 64 },
    { width: 64, height: 32 }
  ]
  const isValidSize = validSizes.some(size => size.width === width && size.height === height)

  console.log(width, height);
  if (!isValidSize) {
    showPopup('Некорректные размеры изображения: убедитесь, что вы загружаете правильный файл.', 'error');
    return false
  }

  const skinformat = await detectSkinFormat(file);
  console.log(skinformat);

  return true;
}