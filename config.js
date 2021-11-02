
// const docViewer = instance.docViewer;
// const annotManager = instance.annotManager;
// call methods from instance, docViewer and annotManager as needed

// you can also access major namespaces from the instance as follows:
// const Tools = instance.Tools;
// const Annotations = instance.Annotations;

// document.on('documentLoaded', () => {
// // call methods relating to the loaded document
// });

window.addEventListener('viewerLoaded', () => {
  console.log("Instance", instance)
  const { Core, UI } = instance;
  const { documentViewer, annotationManager, Tools, Annotations, PDFNet } = Core;
  console.log('Cor is', Core)
  window.UI = UI;
  UI.loadDocument('http://www.africau.edu/images/default/sample.pdf');
  //instance.UI.loadDocument("https://media.testpress.in/Testpress_Django_Assessment_Round.pdf");
  documentViewer.addEventListener('documentLoaded', () => {
    console.log("documentViewer documentLoaded")
  });
});


window.addEventListener('documentLoaded', () => {
  const annotManager = docViewer.getAnnotationManager();
  const rectangle = new Annotations.RectangleAnnotation();
  rectangle.PageNumber = 2;
  rectangle.X = 100;
  rectangle.Y = 100;
  rectangle.Width = 250;
  rectangle.Height = 250;
  rectangle.Author = annotManager.getCurrentUser();
  annotManager.addAnnotation(rectangle);
});

function receiveMessage(event) {
  console.log('receiveMessage', event)
  if (event.isTrusted && typeof event.data === 'object') {
    console.log(event.data)
    switch (event.data.type) {
      case 'OPEN_DOCUMENT_URL':
        const { url } = event.data;
        console.log("Loading...")
        console.log('url', url, instance)

        window.UI.loadDocument(url);
        break;
      case 'CLOSE_DOCUMENT':
        instance.closeDocument();
        break;
      default:
        break;
    }
  }
}

window.addEventListener('message', receiveMessage, false);