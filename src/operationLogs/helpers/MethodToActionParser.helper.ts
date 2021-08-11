export const MethodToAction = (method: string) => {
  switch (method) {
    case 'POST':
      return 'Create';
      break;

    case 'PUT':
      return 'Update';
      break;

    case 'DELETE':
      return 'Delete';
      break;

    case 'PATCH':
      return 'Update';
      break;

    default:
      return 'Undefined';
      break;
  }
}