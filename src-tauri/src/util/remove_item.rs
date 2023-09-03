pub trait RemoveItem<T: PartialEq> {
    fn remove_item(&mut self, value: &T) -> T;
}

impl<T: PartialEq> RemoveItem<T> for Vec<T> {
    fn remove_item(&mut self, value: &T) -> T {
        let index = self.iter().position(|x| x == value).unwrap();
        self.remove(index)
    }
}