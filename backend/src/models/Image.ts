import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Casarepouso from './Casarepouso';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Casarepouso, casarepouso => casarepouso.images)
    @JoinColumn({ name: 'casarepouso_id' })
    casarepouso: Casarepouso;

}