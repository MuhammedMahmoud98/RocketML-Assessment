import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../models/post.model';

@Pipe({
  name: 'postsFilter',
})
export class PostsFilterPipe implements PipeTransform {
  transform(posts: Post[], searchValue: string): Post[] {
    return posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
