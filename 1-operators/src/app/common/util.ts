import { Observable } from 'rxjs';

export function createHttpObservable<T>(url: string): Observable<T> {
  return Observable.create(observer => {
    fetch(url)
      .then(resp => resp.json())
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
