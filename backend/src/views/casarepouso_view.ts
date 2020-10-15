import Casarepouso from '../models/Casarepouso';
import imagesView from './images_view';

export default {
    render(casarepouso: Casarepouso) {
        return {
            id: casarepouso.id,
            name: casarepouso.name,
            latitude: casarepouso.latitude,
            longitude: casarepouso.longitude,
            about: casarepouso.about,
            instructions: casarepouso.instructions,
            opening_hours: casarepouso.opening_hours,
            open_on_weekends: casarepouso.open_on_weekends,
            images: imagesView.renderMany(casarepouso.images)
        }
    },

    renderMany(casasrepouso: Casarepouso[]){
      return casasrepouso.map(casarepouso => this.render(casarepouso));
    }
}
