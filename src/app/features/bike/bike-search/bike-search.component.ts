import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrl: './bike-search.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeSearchComponent {
  searchQuery = '';
  @Output() onSearchEvent = new EventEmitter<string>();

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.onSearchEvent.emit(query);
  }
}
