
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Image, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Hambúrguer Artesanal",
      description: "Carne bovina 180g, queijo cheddar, alface, tomate e molho especial",
      price: 24.90,
      category: "Hambúrgueres",
      available: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco e azeite",
      price: 32.50,
      category: "Pizzas",
      available: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Açaí Tradicional",
      description: "Açaí puro com granola, banana e mel",
      price: 12.90,
      category: "Sobremesas",
      available: false,
      image: "/placeholder.svg"
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const categories = ["Hambúrgueres", "Pizzas", "Bebidas", "Sobremesas", "Pratos Executivos"];

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        category: newItem.category || "Outros",
        available: true,
        image: "/placeholder.svg"
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: "", description: "", price: "", category: "" });
    }
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const deleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
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
                  <Button variant="ghost" size="sm">
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
                  onClick={() => toggleAvailability(item.id)}
                  className={item.available ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {item.available ? "Disponível" : "Indisponível"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="text-center py-12">
          <Image size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum item no cardápio</h3>
          <p className="text-gray-600">Adicione o primeiro item para começar</p>
        </div>
      )}
    </div>
  );
};
