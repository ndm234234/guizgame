import { forwardRef } from 'react';

const FileLoader = forwardRef((props, ref) => {

  const onLoad = (e) => {
    if (e.target.value) {
      let file = e.target.files[0];
      var r = new FileReader();
      r.onload = function (item) {
        try {
          const data = JSON.parse(item.target.result);
          props.onLoad(data);
        }
        catch (err) {
          alert("Ошибка: файл повреждён или не является викториной.");
          console.error(err);
        }
        e.target.value = null;
      };
      r.readAsText(file);
    }
  };

  return (
    <input type="file"
      accept=".txt,.json"
      style={{ display: 'none' }}
      onChange={onLoad}
      ref={ref} />
  );
});

export default FileLoader;