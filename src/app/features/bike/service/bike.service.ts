import { inject, Injectable } from '@angular/core';
import { BikeFacadeService } from '../../../core/facade/bike.facade.service';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { Bike, BikeListItem } from '../../../core/model/bike';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  bikeFacadeService = inject(BikeFacadeService);
  private bikeList$: BehaviorSubject<BikeListItem[]> = new BehaviorSubject<
    BikeListItem[]
  >([
    {
      date_stolen: 1745773200,
      frame_colors: ['Silver, gray or bare metal'],
      id: 2791871,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/909819/large_IMG_5884.jpeg',
      serial: 'JYARN95E0RA000598',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Brooklyn, NY 11211, US',
      title: '2024 Yamaha MT 09 SP',
    },
    {
      date_stolen: 1745773200,
      frame_colors: ['Black'],
      id: 2791886,
      large_img: null,
      serial: 'D22010522',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Queens, NY 11421, US',
      title: 'REI Co-op CTY 1.1',
    },
    {
      date_stolen: 1745719200,
      frame_colors: ['Black'],
      id: 2791619,
      large_img: null,
      serial: 'Unknown',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Newark, NJ 07107, US',
      title: 'Totguard T-276-UL',
    },
    {
      date_stolen: 1745426293,
      frame_colors: ['Yellow or Gold'],
      id: 2789466,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/908376/large_1000002979.png',
      serial: 'Unknown',
      status: 'stolen',
      stolen: true,
      stolen_location: 'New York, NY 10013, US',
      title: '1982 Lotus Road',
    },
    {
      date_stolen: 1744764909,
      frame_colors: ['Black', 'Red'],
      id: 2781420,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/906215/large_1000000583.jpg',
      serial: 'JA2102236',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Bronx County, NY 10454, US',
      title: '2021 Flybikes Fly 11',
    },
    {
      date_stolen: 1744344000,
      frame_colors: ['Silver, gray or bare metal'],
      id: 2778329,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/904268/large_all_city.jpg',
      serial: 'Unknown',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Brooklyn, NY 11231-3918, US',
      title: '2022 All City Space Horse',
    },
    {
      date_stolen: 1743945600,
      frame_colors: ['White'],
      id: 2775827,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/903530/large_unnamed__5_.jpg',
      serial: 'FB82384',
      status: 'stolen',
      stolen: true,
      stolen_location: 'New York, NY 11101, US',
      title: '2025 Cannondale Supersix Evo',
    },
    {
      date_stolen: 1743868800,
      frame_colors: ['Black'],
      id: 2673619,
      large_img: null,
      serial: 'SNFSD22L23508',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Brooklyn, NY 11249, US',
      title: '2024 Lectric eBikes XP 3.0',
    },
    {
      date_stolen: 1743639300,
      frame_colors: ['Black'],
      id: 2773071,
      large_img:
        'https://files.bikeindex.org/uploads/Pu/902121/large_IMG_2460_copy.jpg',
      serial: '23050915',
      status: 'stolen',
      stolen: true,
      stolen_location: 'Brooklyn, NY 11222, US',
      title: '2024 EP Cycling Arrow 10',
    },
    {
      date_stolen: null,
      frame_colors: ['White'],
      id: 2770812,
      large_img: null,
      serial: 'Hidden',
      status: 'found',
      stolen: false,
      stolen_location: null,
      title: 'Surly',
    },
  ]);

  constructor() {}

  getBikesByLocation(location: string): void {
    this.bikeFacadeService
      .getBikesByLocation(location)
      .pipe(
        map((bikes) =>
          bikes.map(
            (bike) =>
              ({
                date_stolen: bike.date_stolen,
                frame_colors: bike.frame_colors,
                id: bike.id,
                large_img: bike.large_img,
                serial: bike.serial,
                status: bike.status,
                stolen: bike.stolen,
                stolen_location: bike.stolen_location,
                title: bike.title,
              } as BikeListItem)
          )
        ),
        take(1),
        tap((bikes) => console.log('bikes', bikes))
      )
      .subscribe((bikesListItems: BikeListItem[]) => {
        this.bikeList$.next(bikesListItems);
      });
  }

  getBikesList(): Observable<BikeListItem[]> {
    return this.bikeList$.asObservable();
  }

  getBikeById(id: number): Observable<Bike> {
    return this.bikeFacadeService.getBikeById(id);
  }
}
