
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Image, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });
  const [editItem, setEditItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const categories = ["Hambúrgueres", "Pizzas", "Bebidas", "Sobremesas", "Pratos Executivos"];

  // Buscar itens do Firestore ao carregar
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Adicionar item ao Firestore
  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      const item = {
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        category: newItem.category || "Outros",
        available: true,
        image: "/placeholder.svg"
      };
      await addDoc(collection(db, "menuItems"), item);
      setNewItem({ name: "", description: "", price: "", category: "" });
    }
  };

  // Alternar disponibilidade no Firestore
  const toggleAvailability = async (id, currentAvailable) => {
    await updateDoc(doc(db, "menuItems", id), { available: !currentAvailable });
  };

  // Editar item no Firestore
  const handleEditItem = async () => {
    if (editItem && editItem.name && editItem.price) {
      await updateDoc(doc(db, "menuItems", editItem.id), {
        name: editItem.name,
        description: editItem.description,
        price: parseFloat(editItem.price),
        category: editItem.category || "Outros"
      });
      setEditDialogOpen(false);
      setEditItem(null);
    }
  };

  // Remover item do Firestore
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "menuItems", id));
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão do Cardápio</h1>
          <p className="text-gray-600">Gerencie os itens do seu cardápio</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus size={16} className="mr-2" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Item</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Ex: Hambúrguer Especial"
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Descreva os ingredientes e características"
                />
              </div>
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={handleAddItem} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Adicionar Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <Badge key={category} variant="secondary" className="px-3 py-1">
            {category}
          </Badge>
        ))}
      </div>

      {/* Menu Items Grid */}
      {loading ? (
        <div className="text-center py-12">Carregando cardápio...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className={`bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 ${!item.available ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-4">
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image size={32} className="text-gray-400" />
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditItem({ ...item, price: item.price.toString() }); setEditDialogOpen(true); }}>
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button
                    variant={item.available ? "default" : "secondary"}
                    size="sm"
                    onClick={() => toggleAvailability(item.id, item.available)}
                    className={item.available ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {item.available ? "Disponível" : "Indisponível"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {menuItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <Image size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum item no cardápio</h3>
          <p className="text-gray-600">Adicione o primeiro item para começar</p>
        </div>
      )}

      {/* Dialog de edição */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome do Item</Label>
                <Input
                  id="edit-name"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  placeholder="Ex: Hambúrguer Especial"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  placeholder="Descreva os ingredientes e características"
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Preço (R$)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editItem.price}
                  onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Categoria</Label>
                <select
                  id="edit-category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={handleEditItem} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Salvar Alterações
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
