import glob
import os
from PIL import Image

def main():
    assets_dir = "/Users/lukilot/Documents/Transnet/public/assets"
    os.chdir(assets_dir)
    count = 0
    for file in glob.glob("*_blueprint_*.png"):
        try:
            img = Image.open(file)
            if img.width == 640:
                print(f"Upscaling {file}...")
                new_size = (img.width * 3, img.height * 3)
                img_resized = img.resize(new_size, Image.Resampling.LANCZOS)
                img_resized.save(file)
                count += 1
        except Exception as e:
            print(f"Failed to process {file}: {e}")
    print(f"Successfully upscaled {count} files.")

if __name__ == "__main__":
    main()
