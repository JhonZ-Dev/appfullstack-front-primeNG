import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './producto/listar/listar/listar.component';
import { GuardarProductoComponent } from './producto/guardar/guardar-producto/guardar-producto.component';
import { EditarProductoComponent } from './producto/editar/editar-producto/editar-producto.component';
import { IndexIndexComponent } from './index/index-index/index-index.component';
import { GraficsComponent } from './grafics/grafics.component';

const routes: Routes = [
  {path:'', component:IndexIndexComponent},
  {path:'productos-lista', component:ListarComponent},
  {path:'productos-agregar', component:GuardarProductoComponent},
  {path:'productos-editar/:id_producto', component:EditarProductoComponent},
  {path:'grafics', component:GraficsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
